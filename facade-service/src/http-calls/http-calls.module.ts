import { Module } from '@nestjs/common';
import { HttpCallsService } from './http-calls.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  providers: [HttpCallsService],
  controllers: [],
  exports: [HttpCallsService],
})
export class HttpCallsModule {}
