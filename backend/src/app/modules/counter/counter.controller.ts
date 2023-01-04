import { Controller, forwardRef, Get, Inject, Param, Body, Req, Query, HttpException, HttpStatus, Post } from "@nestjs/common";
import { CounterService } from "./counter.service";
import { ApiTags } from '@nestjs/swagger';
import { ConditionsDto } from "./conditions.dto";
import { ConvertDate } from "src/app/core/services/convert.date.service";


@ApiTags('counter')
@Controller('counter')
export class CounterController {
    constructor(
        @Inject(forwardRef(() => CounterService))
        private counterService: CounterService,
        private convertDate: ConvertDate,
    ) { }

    @Get('all')
    async findAll() {
        return this.counterService.findAll();
    }
    @Post('filter')
    async findFilter(@Body() conditions: ConditionsDto) {
        let { id, start_date, finish_date } = conditions
        const startDate = this.convertDate.toTimestamp(start_date);
        const finishDate = this.convertDate.toTimestamp(finish_date);
        const result = await this.counterService.findByIdWithFilter(id, startDate, finishDate);
        if (result.count === 0) {
            throw new HttpException('Nenhum click encontrado no periodo informado', HttpStatus.NOT_FOUND)
        }
        return result
    }
    @Post('search/:page')
    async findBySearch(@Body() body: { search: string }, @Param('page') page: string) {
        const shorty = await this.counterService.findOneBySearch(body.search, +page);
        if (!shorty) {
            throw new HttpException(`Nenhum shortcut foi encontrado`, HttpStatus.NOT_FOUND)
        }
        return shorty
    }

    @Get(':id/page/:page')
    async findOne(@Param('id') id: string, @Param('page') page: string) {
        return this.counterService.findOne(id, +page);
    }

    @Get(':id')
    async findOneWithoutPaginate(@Param('id') id: string) {
        return this.counterService.findOneById(id);
    }


}