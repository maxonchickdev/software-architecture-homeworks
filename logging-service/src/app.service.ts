import { Injectable, Logger } from '@nestjs/common';
import { SaveMessageDto } from './dto/save-message.dto';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private messages = new Map<string, string>();

  async saveMessage(saveMessageDto: SaveMessageDto): Promise<boolean> {
    const { uuid, message } = saveMessageDto;

    this.messages.set(uuid, message);

    this.logger.log(`Received message: ${message}`);

    return true;
  }

  async getMessages(): Promise<string> {
    return Array.from(this.messages.values()).join(', ');
  }
}
