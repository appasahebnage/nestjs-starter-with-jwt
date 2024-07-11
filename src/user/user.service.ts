import { genSaltSync, hashSync } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

import { CreateUserRequestDto, CreateUserResponseDto, UserDto } from './dto';
import { SelectUser } from './select';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public async createUser(
    dto: CreateUserRequestDto,
  ): Promise<CreateUserResponseDto> {
    const { email, firstName, lastName, companyName, password } = dto;

    const passwordSalt = genSaltSync(10);
    const passwordHash = hashSync(password, passwordSalt);

    const user = await this.prisma.user.create({
      select: SelectUser,
      data: {
        id: uuid(),
        email,
        firstName,
        lastName,
        companyName,
        passwordHash,
        passwordSalt,
      },
    });

    return user as unknown as CreateUserResponseDto;
  }

  public async getUserById(id: string): Promise<UserDto> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: SelectUser,
    });

    return user as unknown as UserDto;
  }

  public async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email },
    });

    return user;
  }

  // reset password
}
