import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpCallsModule } from './http-calls/http-calls.module';

@Module({
  imports: [HttpCallsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
