/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Transforma los valores recibidos en instancias de clases DTO
    whitelist: true, // Elimina campos no decorados con validadores
    forbidNonWhitelisted: true, // Lanza un error si se recibe un campo no decorado con validadores
  }));
  // Configuración Swagger en NestJS
  const config = new DocumentBuilder()
    .setTitle('Staffing-back')
    .setDescription('Documentación STAFFING')
    .setVersion('1.0')
    .addTag('usuarios')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // URL API
  SwaggerModule.setup('docs', app, document);
  // await app.listen(3000);
  await app.listen(3000).then(() => {
    console.log('Server running on port 3000');
  });
}
bootstrap();
