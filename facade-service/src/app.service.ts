import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateMessageDto } from './dto/create-message.dto';
import { CreateMessageResponseDto } from './dto/create-message-response.dto';
import { HttpCallsService } from './http-calls/http-calls.service';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly httpCallsService: HttpCallsService) {}

  async processMessage(
    createMessageDto: CreateMessageDto,
  ): Promise<CreateMessageResponseDto> {
    try {
      const { message } = createMessageDto;
      const uuid = uuidv4();
      const createMessageResponseDto: CreateMessageResponseDto = {
        uuid: uuid,
        message: message,
      };

      await this.httpCallsService.createMessage(createMessageResponseDto);

      return createMessageResponseDto;
    } catch (err) {
      this.logger.error(`An error occured ${err}`);
      throw new BadRequestException('An error occured');
    }
  }

  async fetchAllData(): Promise<string> {
    const [loggingRes, messagesRes] = await Promise.all([
      this.httpCallsService.getMessageFromMessagesMicroservice(),
      this.httpCallsService.getMessagesFromLoggingMicroservice(),
    ]);

    return loggingRes.concat(', ', messagesRes);
  }
}
