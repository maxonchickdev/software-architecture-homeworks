import { Injectable } from '@nestjs/common';

@Injectable()
export class FacadeServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
