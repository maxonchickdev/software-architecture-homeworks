import { Controller, Get } from '@nestjs/common';
import { MessagesServiceService } from './messages-service.service';

@Controller()
export class MessagesServiceController {
  constructor(
    private readonly messagesServiceService: MessagesServiceService,
  ) {}

  @Get('messages')
  getMessages() {
    return this.messagesServiceService.getMessages();
  }
}
