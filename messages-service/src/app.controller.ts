import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('messages')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getMessages(): Promise<string> {
    return this.appService.messagesService();
  }
}
