import { Module } from '@nestjs/common';
import { FacadeServiceController } from './facade-service.controller';
import { FacadeServiceService } from './facade-service.service';
import { KafkaService } from './kafka/kafka.service';

@Module({
  imports: [],
  controllers: [FacadeServiceController],
  providers: [FacadeServiceService, KafkaService],
})
export class FacadeServiceModule {}
