import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IP_CONFIG } from './configs/ip.config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getServiceInstances(serviceName: string): string[] {
    const serviceRegistry = this.configService.get<{ [key: string]: string[] }>(
      `${IP_CONFIG}.serviceRegistry`,
    );
    return serviceRegistry[serviceName] || [];
  }
}
