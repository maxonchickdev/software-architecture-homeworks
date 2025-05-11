import { Module } from '@nestjs/common';
import { LoggingServiceController } from './logging-service.controller';
import { LoggingServiceService } from './logging-service.service';
import { KafkaService } from './kafka/kafka.service';

@Module({
  imports: [],
  controllers: [LoggingServiceController],
  providers: [LoggingServiceService, KafkaService],
})
export class LoggingServiceModule {}
