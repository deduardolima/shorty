import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  app.enableCors({
    allowedHeaders: "*",
    origin: "*"
  });

  const config = new DocumentBuilder()
    .setTitle('Encurtador')
    .setDescription('API para criação, consulta e edição de shortcuts')
    .setVersion('1.1.0')
    .addTag('shorty')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3000);

}
bootstrap();
