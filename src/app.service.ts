import { Injectable } from '@nestjs/common';
import { GreetDto } from './zod/greet.dto';

@Injectable()
export class AppService {
  greet(): GreetDto {
    return { message: 'Welcome to nestjs-starter-with-jwt!' };
  }
}
