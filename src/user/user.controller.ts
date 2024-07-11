import { zodToOpenAPI } from 'nestjs-zod';

import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { JwtGuard } from '@src/jwt/guards/jwt.guard';
import { ZodValidationPipe } from '@src/utils';

import { CreateUserRequestDto, CreateUserResponseDto, UserDto } from './dto';
import { UserService } from './user.service';
import { CurrentUser } from './decorator/current-user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserRequestDto))
  @ApiCreatedResponse({
    schema: zodToOpenAPI(CreateUserResponseDto),
  })
  public async createUser(
    @Body() dto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    return await this.userService.createUser(dto);
  }

  @UseGuards(JwtGuard)
  @Get('/me')
  public async getMe(@CurrentUser() user: UserDto): Promise<UserDto> {
    return user;
  }
}
