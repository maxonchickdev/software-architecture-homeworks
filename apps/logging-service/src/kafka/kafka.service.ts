import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { LoggingServiceService } from '../logging-service.service';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor(private readonly loggingServiceService: LoggingServiceService) {
    const brokers =
      'nestjs-kafka-1:9092,nestjs-kafka-2:9093,nestjs-kafka-3:9094'.split(',');
    this.kafka = new Kafka({
      clientId: process.env.SERVICE_NAME,
      brokers,
    });
    this.consumer = this.kafka.consumer({ groupId: 'logging-group' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: 'logging-topic',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ message }: EachMessagePayload) => {
        const value = message.value.toString();
        this.loggingServiceService.addLog(value);
      },
    });
  }
}
