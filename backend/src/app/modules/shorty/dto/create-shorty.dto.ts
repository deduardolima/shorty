import { IsNotEmpty, MaxLength, IsEnum, IsBoolean } from "class-validator";
import { IsShortcutAlreadyExist } from "../IsShortcutAlreadyExist-validator";
import { ApiProperty } from '@nestjs/swagger'

export enum STATUS_TYPES {
    RASCUNHO = 0,
    PUBLICADO = 1,
    CANCELADO = 2,
    EXPIRADO = 3,
    ARQUIVADO = 4
}
export enum ORIGEM_TYPES {
    CONDOR = "condor",
    AUTOPOSTO = "auto-posto",
    GIGANTE = "gigante"
}
export class CreateShortyDto {
    @ApiProperty()
    @IsNotEmpty({
        message: 'nome é campo obrigatório'
    })
    name: string;
    @ApiProperty()
    description: string;

    @IsBoolean({
        message: 'Informe valores true ou false',
    })
    @ApiProperty()
    sms: boolean;
    @MaxLength(7, {
        message: 'Shorty muito longo, tamanho maximo de 7 caracteres',
    })
    @IsShortcutAlreadyExist({

        message: 'Encurtador já esta em utilização',
    })
    @ApiProperty()
    shorty: string;
    @ApiProperty()
    link_destino: string;
    @IsNotEmpty({
        message: 'Data de início é obrigatório'
    })
    @ApiProperty({
        default: "01/01/2023"
    })
    start_date: string | number;
    @ApiProperty({
        default: "25/12/2023"
    })
    finish_date: string | number;

    @IsEnum(STATUS_TYPES)
    @IsNotEmpty({
        message: 'Status é campo obrigatório'
    })
    @ApiProperty({
        enum: [0, 1, 2, 3, 4],
        default: 0,
    })
    status: STATUS_TYPES;
    @IsEnum(ORIGEM_TYPES)
    @IsNotEmpty({
        message: 'Origem é campo obrigatório'
    })
    @ApiProperty({ enum: ['condor', 'auto-posto', 'gigante'] })
    origem: ORIGEM_TYPES;

}