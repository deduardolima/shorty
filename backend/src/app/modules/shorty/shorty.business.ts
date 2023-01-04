import { Injectable } from "@nestjs/common";
import { ConvertDate } from "../../core/services/convert.date.service";
import { CustomError } from "../../core/error/CustomError";
import { QrCodeGenerator } from "../../core/services/qrcode.generator.service";
import { ShortcutGenerator } from "../../core/services/shortcut.generator.service";
import { CounterService } from "../counter/counter.service"
import { CreateShortyDto } from "./dto/create-shorty.dto"
import { ShortyService } from "./shorty.service"
import { UpdateShortyDto } from "./dto/update-shorty.dto";

@Injectable()
export class ShortyBusiness {

    constructor(
        private readonly counterService: CounterService,
        private shortyService: ShortyService,
        private convertDate: ConvertDate,
        private qrCodeGenerator: QrCodeGenerator,
        private shortcutGenerator: ShortcutGenerator,

    ) { }

    public create = async (createShortyDto: CreateShortyDto, file?: any) => {
        try {

            let { name, shorty, description, sms, link_destino, start_date, finish_date, status, origem } = createShortyDto

            if (file) {
                createShortyDto.link_destino = `${process.env.BASE_URL}/upload/${file}`;
            }
            if (shorty && sms === true) {
                if (shorty.length > 5)
                    throw new CustomError(409, "O tamanho maximo permitido para link SMS é 5 caracteres")
            }

            const currentDate = this.convertDate.currentDate();
            const convertedStartDate = this.convertDate.toTimestamp(start_date);
            createShortyDto.start_date = convertedStartDate;
            let convertedFinishDate = this.convertDate.toTimestamp(finish_date)
            createShortyDto.finish_date = convertedFinishDate;

            if (!createShortyDto.finish_date) {
                createShortyDto.finish_date = null
            }
            if (currentDate > convertedStartDate) {
                throw new CustomError(409, "A data de inicio não pode ser menor que a data atual")
            }
            if (sms === false && shorty) {
                if (shorty.length > 7 || shorty.length <= 5)
                    throw new CustomError(409, "O tamanho do shortcut customizado para web/email é de 6 a 7 caracteres")
            }

            if (name && shorty) {

                const shortcut = `${process.env.BASE_URL}/${createShortyDto.shorty}`

                await this.shortyService.create(createShortyDto)

                const qrCode = await this.qrCodeGenerator.generateQrCode(createShortyDto.shorty, shortcut)
                const shorty = await this.shortyService.findOneByShorty(createShortyDto.shorty)

                return { shorty, qrCode, shortcut }
            }
            // Encurtador aleatorio para SMS
            if (sms === true) {
                function getRandomArbitrary(min: number, max: number) {
                    return Math.floor(Math.random()) * (max - min) + min;
                }
                const short = this.shortcutGenerator.generatorShortcut(getRandomArbitrary(2, 6))
                createShortyDto.shorty = short

                const shortcut = `${process.env.BASE_URL}/${short}`

                await this.shortyService.create(createShortyDto)

                const qrCode = await this.qrCodeGenerator.generateQrCode(createShortyDto.shorty, shortcut)

                const shorty = await this.shortyService.findOneByShorty(short)

                return { shorty, qrCode, shortcut }
            }
            // Encurtador aleatorio de 7 caracteres para email e web
            if (sms === false) {

                function getRandomArbitrary(min: number, max: number) {
                    return Math.floor(Math.random()) * (max - min) + min;
                }
                const short = this.shortcutGenerator.generatorShortcut(getRandomArbitrary(6, 8))
                createShortyDto.shorty = short
                const shortcut = `${process.env.BASE_URL}/${short}`

                await this.shortyService.create(createShortyDto)
                const qrCode = await this.qrCodeGenerator.generateQrCode(createShortyDto.shorty, shortcut)
                const shorty = await this.shortyService.findOneByShorty(short)

                return { shorty, qrCode, shortcut }
            }
        }
        catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }
    public update = async (id: string, updateShortyDto: UpdateShortyDto) => {
        try {

            let { name, description, link_destino, start_date, finish_date, status, origem } = updateShortyDto

            const currentDate = this.convertDate.currentDate();
            const convertedStartDate = this.convertDate.toTimestamp(start_date);
            updateShortyDto.start_date = convertedStartDate;
            let convertedFinishDate = this.convertDate.toTimestamp(finish_date)
            updateShortyDto.finish_date = convertedFinishDate;


            if (!updateShortyDto.finish_date || NaN) {
                updateShortyDto.finish_date = null
            }
            if (currentDate > convertedStartDate) {
                throw new CustomError(409, "A data de inicio não pode ser menor que a data atual")
            }

            return await this.shortyService.update(id, updateShortyDto);

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public getFindByShortcut = async (shorty: string) => {
        try {
            const item = await this.shortyService.findOneByShorty(shorty);


            if (item) {
                await this.counterService.create(item._id, item.name)
                return item.link_destino;
            } else {
                throw new CustomError(409, `O ${shorty} não existe ou não esta ativo!`)
            }

        } catch (error: any) {
            throw new CustomError(error.statusCode, error.message)
        }
    }

    public registerClick = async (shorty: string) => {

        const shortyFromDB = await this.shortyService.findOneByShorty(shorty);

        if (shortyFromDB) {
            await this.counterService.create(shortyFromDB._id, shortyFromDB.name)
        }

    }
}
