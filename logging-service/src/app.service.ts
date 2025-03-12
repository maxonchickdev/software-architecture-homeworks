import { Injectable, Logger } from '@nestjs/common';
import { SaveMessageDto } from './dto/save-message.dto';
import { Client, IMap } from 'hazelcast-client';
import { HazelcastClient } from 'hazelcast-client/lib/HazelcastClient';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);
  private client: Client;
  private map: IMap<string, string>;

  constructor() {
    this.initHazelcast();
  }

  private async initHazelcast() {
    this.client = await HazelcastClient.newHazelcastClient();
    this.map = await this.client.getMap('messages');
  }

  async saveMessage(saveMessageDto: SaveMessageDto): Promise<boolean> {
    const { uuid, message } = saveMessageDto;

    await this.map.set(uuid, message);

    this.logger.log(`Received message: ${message}`);

    return true;
  }

  async getMessages(): Promise<string> {
    const entries = await this.map.entrySet();
    return Array.from(entries.values()).join(', ');
  }
}
