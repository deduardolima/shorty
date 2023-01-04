import { join } from 'path';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { CoreModule } from './app/core/core.module';
import { ShortyModule } from './app/modules/shorty/shorty.module';
import { CounterModule } from './app/modules/counter/counter.module';
import * as redisStore from 'cache-manager-redis-store';



@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    CacheModule.register<any>({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT)
    }),    
    CoreModule,
    ShortyModule,
    CounterModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }

