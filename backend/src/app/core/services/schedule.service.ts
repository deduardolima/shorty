import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ShortyService } from '../../modules/shorty/shorty.service';


@Injectable()
export class ScheduleService {
    constructor(

        private shortyService: ShortyService,
    ) { }
    private date = new Date().getTime()

    @Cron("* * * * *")
    async checkStatus() {
        await this.shortyService.publishedShorty(this.date);
        await this.shortyService.draftShorty(this.date);
        await this.shortyService.expiretedShorty(this.date);
    }

};
