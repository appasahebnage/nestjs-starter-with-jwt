import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { zodToOpenAPI } from 'nestjs-zod';
import { GreetDto } from './zod/greet.dto';

@ApiTags('Root')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({
    // schema: {
    //   type: 'object',
    //   properties: {
    //     message: {
    //       type: 'string',
    //       example: 'Welcome to nestjs-starter-with-jwt!',
    //     },
    //   },
    // },
    schema: zodToOpenAPI(GreetDto),
  })
  greet(): GreetDto {
    return this.appService.greet();
  }
}
