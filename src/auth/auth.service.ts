import { compareSync } from 'bcrypt';

import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenService } from '@src/token/token.service';
import { UserDto } from '@src/user/dto';
import { UserService } from '@src/user/user.service';

import { SignInRequestDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  public async signIn(dto: SignInRequestDto): Promise<{
    user: UserDto;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  }> {
    const { email, password } = dto;

    const user = await this.userService.getUserByEmail(email);
    const { id: userId, firstName, lastName, companyName } = user;

    const isValidPassword = compareSync(password, user.passwordHash);

    if (!isValidPassword) {
      throw new BadRequestException('Invalid password');
    }

    const { token: refreshToken } =
      await this.tokenService.issueRefreshToken(userId);
    const accessToken = await this.tokenService.issueAccessToken(userId);

    const tokens = {
      accessToken,
      refreshToken,
    };

    const userDto: UserDto = {
      id: userId,
      email,
      firstName,
      lastName,
      companyName,
    };

    return { user: userDto, tokens };
  }
}
