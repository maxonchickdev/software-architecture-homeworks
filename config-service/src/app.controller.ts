import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('config')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':serviceName')
  getServiceInstances(@Param('serviceName') serviceName: string): string[] {
    return this.appService.getServiceInstances(serviceName);
  }
}
