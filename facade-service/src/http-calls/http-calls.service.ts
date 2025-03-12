import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CreateMessageResponseDto } from 'src/dto/create-message-response.dto';

@Injectable()
export class HttpCallsService {
  private readonly logger = new Logger(HttpCallsService.name);

  private readonly configServerBaseUrl = 'http://localhost:3004/config';
  private readonly loggingServiceUrl = 'logging';

  constructor(private readonly httpService: HttpService) {}

  private getRandomLoggingServiceBaseUrl(instances: string[]): string {
    const randomIndex = Math.floor(Math.random() * instances.length);
    return instances[randomIndex];
  }

  private async getLoggingServiceInstances(): Promise<string[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.configServerBaseUrl}/logging`),
      );
      return response.data;
    } catch (error) {
      this.logger.log(`Faild to fetch logging service instances: ${error}`);
      throw new BadRequestException('Faild to fetch logging service instances');
    }
  }

  async getMessagesFromLoggingMicroservice(): Promise<string> {
    try {
      const instances = await this.getLoggingServiceInstances();
      const baseUrl = this.getRandomLoggingServiceBaseUrl(instances);
      const getMessagesFromLoggingMicroserviceResponse =
        await this.httpService.axiosRef({
          method: 'GET',
          baseURL: baseUrl,
          url: this.loggingServiceUrl,
          headers: {
            'Content-Type': 'application/json',
          },
        });

      return getMessagesFromLoggingMicroserviceResponse.data;
    } catch (err) {
      this.logger.error(`An error occured ${err}`);
      throw new BadRequestException('An error occured');
    }
  }

  async getMessageFromMessagesMicroservice(): Promise<string> {
    try {
      const instances = await this.getLoggingServiceInstances();
      const baseUrl = this.getRandomLoggingServiceBaseUrl(instances);
      const getMessageFromMessagesMicroserviceResponse =
        await this.httpService.axiosRef({
          method: 'GET',
          baseURL: baseUrl,
          url: this.loggingServiceUrl,
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
      const instances = await this.getLoggingServiceInstances();
      const baseUrl = this.getRandomLoggingServiceBaseUrl(instances);
      await this.httpService.axiosRef({
        method: 'POST',
        baseURL: baseUrl,
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
