import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, Producer, ProducerRecord } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  private kafka: Kafka;
  private producer: Producer;

  constructor() {
    const brokers =
      'nestjs-kafka-1:9092,nestjs-kafka-2:9093,nestjs-kafka-3:9094'.split(',');
    this.kafka = new Kafka({
      clientId: 'facade-service',
      brokers,
    });
    this.producer = this.kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async sendMessage(topic: string, message: string) {
    const record: ProducerRecord = {
      topic,
      messages: [{ value: message }],
    };
    await this.producer.send(record);
  }
}
