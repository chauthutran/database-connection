import { Injectable } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @Get()
  async connectToDB() {
    return { message: `Server is started !` };
  }
}
