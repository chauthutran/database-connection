import { Injectable } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Server is started !';
  }
}
