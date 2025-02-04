import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { SaveMessageDto } from './dto/save-message.dto';

@Controller('logging')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async logMessage(@Body() saveMessageDto: SaveMessageDto): Promise<boolean> {
    return await this.appService.saveMessage(saveMessageDto);
  }

  @Get()
  async getAllMessages(): Promise<string> {
    return await this.appService.getMessages();
  }
}
