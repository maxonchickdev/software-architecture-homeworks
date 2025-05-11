import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesServiceService {
  private messages: string[] = [];

  addMessage(message: string) {
    console.log(`[${process.env.SERVICE_NAME}] Received message: ${message}`);
    this.messages.push(message);
  }

  getMessages() {
    return this.messages;
  }
}
