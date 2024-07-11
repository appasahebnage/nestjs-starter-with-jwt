import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto';
import { ZodValidationPipe } from '@src/utils';
import { UserDto } from '@src/user/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ZodValidationPipe(SignInRequestDto))
  public async signIn(@Body() dto: SignInRequestDto): Promise<{
    user: UserDto;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  }> {
    return await this.authService.signIn(dto);
  }
}
