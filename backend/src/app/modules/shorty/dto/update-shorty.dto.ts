import { IsBoolean, IsEnum} from "class-validator";
import { ORIGEM_TYPES, STATUS_TYPES } from './create-shorty.dto';
import { ApiProperty } from '@nestjs/swagger'

export class UpdateShortyDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    sms: boolean;
    @ApiProperty()
    link_destino: string;
    @ApiProperty()
    start_date: string | number;
    @ApiProperty()
    finish_date: string | number;
    @ApiProperty({
        enum: [0, 1, 2, 3, 4],
        default: 0,
    })
    status: STATUS_TYPES;
    @ApiProperty({ enum: ['condor', 'auto-posto', 'gigante'] })
    origem: ORIGEM_TYPES;

}