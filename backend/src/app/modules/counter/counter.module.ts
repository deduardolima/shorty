import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConvertDate } from "../../core/services/convert.date.service";
import { CounterController } from "./counter.controller";
import { Counter, CounterSchema } from "./counter.schema";
import { CounterService } from "./counter.service";


@Module({
    imports: [MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),],
    controllers: [CounterController],
    providers: [CounterService,ConvertDate],
    exports: [CounterService],

})

export class CounterModule { }