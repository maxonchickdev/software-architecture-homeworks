import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingServiceService {
  private logs: string[] = [];

  addLog(message: string) {
    console.log(`[${process.env.SERVICE_NAME}] Logging message: ${message}`);
    this.logs.push(message);
  }

  getLogs() {
    return this.logs;
  }
}
