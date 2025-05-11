import { Module } from '@nestjs/common';
import { MessagesServiceController } from './messages-service.controller';
import { MessagesServiceService } from './messages-service.service';
import { KafkaService } from './kafka/kafka.service';

@Module({
  imports: [],
  controllers: [MessagesServiceController],
  providers: [MessagesServiceService, KafkaService],
})
export class MessagesServiceModule {}
