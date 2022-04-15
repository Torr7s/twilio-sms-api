import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Twilio SMS Api')
    .setDescription(
      'This is a documentation to show how the whole application works'
    )
    .setVersion('3.0.0')
    .addTag('Users')
    .addTag('Authentication')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)

  await app.listen(3030)
}

bootstrap()