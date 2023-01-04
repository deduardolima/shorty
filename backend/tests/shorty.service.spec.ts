import { Test, TestingModule } from "@nestjs/testing";
import { Shorty } from "../src/app/modules/shorty/shorty.schema";
import { ShortyService } from "../src/app/modules/shorty/shorty.service";
import { input } from "./mocks/ShortMock";

const shortyEntityList: Shorty[] = [
    new Shorty({ name: "Aniver Condor", shorty: "dsa515", link_destino: "https://www.condor.com.br", status: 1 }),
    new Shorty({ name: "Natal 2022", description: "descrição qualquer .....", shorty: "Wql12D", link_destino: "https://www.condor.com.br", status: 1 }),
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

describe('ShortyService', () => {
    let shortyService: ShortyService;


    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [{
                provide: ShortyService,
                useValue: {
                    ShortyModel: jest.fn(),
                    create: jest.fn().mockResolvedValue(newShorty),
                    update: jest.fn().mockResolvedValue(updateShorty),
                    findAll: jest.fn().mockResolvedValue(shortyEntityList),
                    findOne: jest.fn().mockResolvedValue(shortyEntityList[0]),
                    findOneByShorty: jest.fn().mockResolvedValue(shortyEntityList[1]),

                }
            }],
        }).compile();
        shortyService = module.get<ShortyService>(ShortyService);
    });
    it('should be defined', () => {
        expect(shortyService).toBeDefined();

    });
    describe("create", () => {
        it('Sucesso', async () => {
            const result = await shortyService.create(input)
            expect(result).toEqual(newShorty);

        });
        it("Deve retornar erro", () => {
            jest.spyOn(shortyService, 'create').mockRejectedValueOnce(new Error());
            expect(shortyService.create(input)).rejects.toThrowError();
        });

    });
    describe("update", () => {
        it('Sucesso', async () => {
            const id = "1"
            const result = await shortyService.update(id, input)
            expect(result).toEqual(updateShorty);
        });
        it("Deve retornar erro", () => {
            jest.spyOn(shortyService, 'update').mockRejectedValueOnce(new Error());
            expect(shortyService.update("1", input)).rejects.toThrowError();
        });
    });
    describe('findAll', () => {
        it('Deve retornar lista de todos shorty criados', async () => {
            const page = 1
            //Act
            const result = await shortyService.findAll(page);
            //Assert
            expect(result).toEqual(shortyEntityList);
            expect(shortyService.findAll).toHaveBeenCalledTimes(1)
            expect.assertions(2)

        });
        it("Deve retornar erro", () => {
            const page = 1
            jest.spyOn(shortyService, 'findAll').mockRejectedValueOnce(new Error());
            expect(shortyService.findAll(page)).rejects.toThrowError();
            expect.assertions(1)
        })
    });
    describe('findOne', () => {
        it('Deve retornar um shorty por ID', async () => {
            const id = "1"
            const result = await shortyService.findOne(id);
            expect(result).toEqual(shortyEntityList[0]);
            expect(shortyService.findOne).toHaveBeenCalledTimes(1);
            expect(shortyService.findOne).toHaveBeenCalledWith("1");
            expect.assertions(3)
        });
        it('Deve retornar erro na consulta por ID', () => {
            const id = "1"

            jest.spyOn(shortyService, 'findOne').mockRejectedValueOnce(new Error());
            expect(shortyService.findOne(id)).rejects.toThrowError();
            expect.assertions(1)
        });
    });

    describe('findOneByShorty', () => {
        it('Deve retornar um shorty por nome', async () => {
            const id = "1"
            const result = await shortyService.findOneByShorty(id);
            expect(result).toEqual(shortyEntityList[1]);
            expect(shortyService.findOneByShorty).toHaveBeenCalledTimes(1);
            expect(shortyService.findOneByShorty).toHaveBeenCalledWith("1");
            expect.assertions(3)
        });
        it('Deve retornar erro na consulta por nome', () => {
            const id = "1"
            jest.spyOn(shortyService, 'findOneByShorty').mockRejectedValueOnce(new Error());
            expect(shortyService.findOneByShorty(id)).rejects.toThrowError();
            expect.assertions(1)
        });
    });

});


