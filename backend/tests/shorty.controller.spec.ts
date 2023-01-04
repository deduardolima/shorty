import { Test, TestingModule } from '@nestjs/testing'
import { ShortyBusiness } from '../src/app/modules/shorty/shorty.business';
import { ShortyController } from "../src/app/modules/shorty/shorty.controller";
import { Shorty } from '../src/app/modules/shorty/shorty.schema';
import { ShortyService } from '../src/app/modules/shorty/shorty.service';
import { AppController } from '../src/app.controller';
import { input, input2, input3, input4 } from './mocks/ShortMock';

const shortyEntityList: Shorty[] = [
    new Shorty({ name: "Aniver Condor", shorty: "dsa515", link_destino: "https://www.condor.com.br", status: 1 }),
    new Shorty({ name: "Natal 2022", shorty: "Wql12D", link_destino: "https://www.condor.com.br", status: 1 }),
    new Shorty({ name: "Copa 2022", shorty: "FwLsm", link_destino: "https://www.condor.com.br", status: 1 }),
]

const newShorty = new Shorty({
    name: "banner_pinheirinho", description: "descrição qualquer .....", sms: false, link_destino: "https://www.condor.com.br/?utm_source=encurtador&utm_medium=organico&utm_campaign=teste",
    start_date: 1515151515, finish_date: 151515151, status: 1, origem: "autoposto",
})

const updateShorty = new Shorty({
    name: "banner_pinheirinho Alterado", shorty: "Adce1", description: "descrição qualquer .....", sms: false, link_destino: "https://www.condor.com.br/?utm_source=encurtador&utm_medium=organico&utm_campaign=teste",
    start_date: 121243455, finish_date: 312312334, status: 1, origem: "condor"

})

describe('ShortyController', () => {
    let shortyController: ShortyController;
    let shortyBusiness: ShortyBusiness
    let shortyService: ShortyService;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ShortyController],
            providers: [{
                provide: ShortyBusiness,
                useValue: {
                    counterService: jest.fn(),
                    ShortyService: jest.fn(),
                    ConvertDate: jest.fn(),
                    findOneByShorty: jest.fn(),
                    QrCodeGenerator: jest.fn(),
                    ShortcutGenerator: jest.fn().mockResolvedValue(shortyEntityList[1]),
                    create: jest.fn().mockResolvedValue(newShorty),
                },
            }, {
                provide: ShortyService,
                useValue: {
                    ShortyModel: jest.fn(),
                    create: jest.fn().mockResolvedValue(newShorty),
                    update: jest.fn().mockResolvedValue(updateShorty),
                    findAll: jest.fn().mockResolvedValue(shortyEntityList),
                    findOne: jest.fn().mockResolvedValue(shortyEntityList[0]),
                    findOneByShorty: jest.fn(),

                }
            }],
        }).compile();

        shortyController = module.get<ShortyController>(ShortyController);
        shortyService = module.get<ShortyService>(ShortyService);
        shortyBusiness = module.get<ShortyBusiness>(ShortyBusiness);

    });
    it('should be defined', () => {
        expect(shortyController).toBeDefined();
        expect(shortyService).toBeDefined();
        expect(shortyBusiness).toBeDefined();


    });
    describe('findAll', () => {
        it('Deve retornar lista de todos shorty criados', async () => {
            const page = '1'
            //Act
            const result = await shortyController.findAll(page);
            //Assert
            expect(result).toEqual(shortyEntityList);
            expect(shortyService.findAll).toHaveBeenCalledTimes(1)
            expect.assertions(2)

        });
        it("Deve retornar erro", () => {
            const page = '1'
            jest.spyOn(shortyService, 'findAll').mockRejectedValueOnce(new Error());
            expect(shortyController.findAll(page)).rejects.toThrowError();
            expect.assertions(1)
        })
    });
    describe('create', () => {
        it('Deve retornar sucesso na criação', async () => {
            //Act
            const result = await shortyController.create(input);
            //Assert
            expect(result).toEqual(newShorty);
            expect(shortyBusiness.create).toHaveBeenCalledTimes(1)
            expect(shortyBusiness.create).toHaveBeenCalledWith(input)
            expect.assertions(3)
        });
        it('Deve retornar erro na criação', () => {

            jest.spyOn(shortyBusiness, 'create').mockRejectedValueOnce(new Error());
            expect(shortyController.create(input)).rejects.toThrowError();
        });
    });
    describe('findOne', () => {
        it('Deve retornar um shorty por ID', async () => {
            const id = "1"
            const result = await shortyController.findOne(id);
            expect(result).toEqual(shortyEntityList[0]);
            expect(shortyService.findOne).toHaveBeenCalledTimes(1);
            expect(shortyService.findOne).toHaveBeenCalledWith("1");
            expect.assertions(3)
        });
        it('Deve retornar erro na consulta por ID', () => {
            const id = "1"

            jest.spyOn(shortyController, 'findOne').mockRejectedValueOnce(new Error());
            expect(shortyController.findOne(id)).rejects.toThrowError();
            expect.assertions(1)
        });

    });
    describe('update', () => {
        it('Deve retornar sucesso no update do shorty', async () => {
            const id = "1"
            const result = await shortyController.update(id, input3);

            expect(result).toEqual(updateShorty);
            expect(shortyService.update).toHaveBeenCalledTimes(1)
            expect(shortyService.update).toHaveBeenCalledWith(id, input3)
            expect.assertions(3)
        });
        it('Deve retornar erro no update', () => {
            const id = "1"

            jest.spyOn(shortyController, 'update').mockRejectedValueOnce(new Error());
            expect(shortyController.update(id, input)).rejects.toThrowError();
        });
    });
});