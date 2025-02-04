import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateMessageResponseDto } from 'src/dto/create-message-response.dto';

@Injectable()
export class HttpCallsService {
  private readonly logger = new Logger(HttpCallsService.name);

  private readonly loggingServiceBaseUrl = 'http://localhost:3001/';
  private readonly loggingServiceUrl = 'logging';

  private readonly messagesServiceBaseUrl = 'http://localhost:3002/';
  private readonly messagesServiceUrl = 'messages';

  constructor(private readonly httpService: HttpService) {}

  async getMessagesFromLoggingMicroservice(): Promise<string> {
    try {
      const getMessagesFromLoggingMicroserviceResponse =
        await this.httpService.axiosRef({
          method: 'GET',
          baseURL: this.loggingServiceBaseUrl,
          url: this.loggingServiceUrl,
          headers: {
            'Content-Type': 'application/json',
          },
        });

      console.log(getMessagesFromLoggingMicroserviceResponse.data);

      return getMessagesFromLoggingMicroserviceResponse.data;
    } catch (err) {
      this.logger.error(`An error occured ${err}`);
      throw new BadRequestException('An error occured');
    }
  }

  async getMessageFromMessagesMicroservice(): Promise<string> {
    try {
      const getMessageFromMessagesMicroserviceResponse =
        await this.httpService.axiosRef({
          method: 'GET',
          baseURL: this.messagesServiceBaseUrl,
          url: this.messagesServiceUrl,
          headers: {
            'Content-Type': 'application/json',
          },
        });

      console.log(getMessageFromMessagesMicroserviceResponse.data);

      return getMessageFromMessagesMicroserviceResponse.data;
    } catch (err) {
      this.logger.error(`An error occured ${err}`);
      throw new BadRequestException('An error occured');
    }
  }

  async createMessage(
    createMessageResponseDto: CreateMessageResponseDto,
  ): Promise<boolean> {
    try {
      await this.httpService.axiosRef({
        method: 'POST',
        baseURL: this.loggingServiceBaseUrl,
        url: this.loggingServiceUrl,
        data: createMessageResponseDto,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return true;
    } catch (err) {
      this.logger.error(`An error occured ${err}`);
      throw new BadRequestException('An error occured');
    }
  }
}
