import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ConditionsDto {
    @ApiProperty()
    @IsNotEmpty({
        message: 'id é campo obrigatório'
    })
    id:string;
    @IsNotEmpty({
        message: 'start_date é campo obrigatório'
    })
    @ApiProperty({
        default: "25/11/2022"
    })
    start_date: string | number;
    @IsNotEmpty({
        message: 'finish_date é campo obrigatório'
    })
    @ApiProperty({
        default: "25/12/2022"
    })
    finish_date: string | number;

}