import { CacheModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as redisStore from 'cache-manager-redis-store';
import { ShortyService } from './shorty.service';
import { ShortyBusiness } from './shorty.business';
import { ShortyController } from './shorty.controller';
import { Shorty, ShortySchema } from './shorty.schema';
import { ConvertDate } from 'src/app/core/services/convert.date.service';
import { QrCodeGenerator } from 'src/app/core/services/qrcode.generator.service';
import { ShortcutGenerator } from 'src/app/core/services/shortcut.generator.service';
import { IsShortcutAlreadyExistConstraint } from './IsShortcutAlreadyExist-validator';
import { CounterModule } from '../counter/counter.module';
import { ScheduleService } from 'src/app/core/services/schedule.service';




@Module({
  imports: [MongooseModule.forFeature([{ name: Shorty.name, schema: ShortySchema }]),
  CounterModule,
  CacheModule.register<any>({
    store: redisStore,
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT)
  }),
  ],
  controllers: [ShortyController],
  providers: [
    ConvertDate,    
    ShortyBusiness,
    ShortyService,
    QrCodeGenerator,
    ShortcutGenerator,
    ScheduleService,
    IsShortcutAlreadyExistConstraint,
  ],
  exports: [ShortyService, ShortyBusiness],
})
export class ShortyModule { }
