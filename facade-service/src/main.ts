import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Facade service')
    .setDescription('Facade service implementation')
    .setVersion('0.0.1')
    .addServer('http://localhost:3000/')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('/', app, document, {
    customSiteTitle: 'Facade service',
  });

  await app.listen(process.env.PORT ?? 3000);

  Logger.log('🚀 Application is running on: http://localhost:3000/');
}
bootstrap();
