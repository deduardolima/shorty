import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { optionsMongo } from './core.config';



@Module({
    imports: [
        ConfigModule.forRoot(),
        ScheduleModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_DSN, optionsMongo),
    ]
})
export class CoreModule { }
