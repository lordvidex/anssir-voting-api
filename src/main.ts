import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors()

  // swagger docs configs
  const PORT = process.env.PORT || 3000;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('ANSSIR voting API')
    .setDescription('Secure API for ANSSIR 2022 voting')
    .addServer(`http://localhost:${PORT}`, 'Local Server')
    .addServer(process.env.HOST, 'Production Server')
    // .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, doc);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
