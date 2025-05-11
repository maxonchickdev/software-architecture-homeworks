import { NestFactory } from '@nestjs/core';
import { FacadeServiceModule } from './facade-service.module';

async function bootstrap() {
  const app = await NestFactory.create(FacadeServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
