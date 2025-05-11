import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { MessagesServiceService } from '../messages-service.service';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka;
  private consumer: Consumer;

  constructor(private readonly messagesServiceService: MessagesServiceService) {
    const brokers =
      'nestjs-kafka-1:9092,nestjs-kafka-2:9093,nestjs-kafka-3:9094'.split(',');
    this.kafka = new Kafka({
      clientId: process.env.SERVICE_NAME,
      brokers,
    });
    this.consumer = this.kafka.consumer({ groupId: 'messages-group' });
  }

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: 'messages-topic',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ message }: EachMessagePayload) => {
        const value = message.value.toString();
        this.messagesServiceService.addMessage(value);
      },
    });
  }
}
