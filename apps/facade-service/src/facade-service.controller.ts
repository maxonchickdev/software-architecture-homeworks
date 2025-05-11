import { Controller, Get, Post, Body } from '@nestjs/common';
import { KafkaService } from './kafka/kafka.service';

@Controller()
export class FacadeServiceController {
  constructor(private readonly kafkaService: KafkaService) {}

  @Post('messages')
  async createMessage(@Body() body: { message: string }) {
    await this.kafkaService.sendMessage('messages-topic', body.message);
    await this.kafkaService.sendMessage('logging-topic', body.message);
    return { status: 'Message sent to queue' };
  }

  @Get('messages')
  async getMessages() {
    const randomInstance = Math.random() > 0.5 ? 3001 : 3002;
    const response = await fetch(
      `http://messages-service-${randomInstance === 3001 ? '1' : '2'}:3000/messages`,
    );
    const messages = await response.json();

    const loggingResponses = await Promise.all([
      fetch('http://logging-service-1:4000/logs'),
      fetch('http://logging-service-2:4000/logs'),
      fetch('http://logging-service-3:4000/logs'),
    ]);

    const allLogs = await Promise.all(loggingResponses.map((r) => r.json()));
    const combinedLogs = allLogs.flat();

    return {
      messages,
      logs: combinedLogs,
    };
  }
}
