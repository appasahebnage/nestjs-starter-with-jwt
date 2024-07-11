import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvService } from '@src/env/env.service';
import { PrismaService } from '@src/prisma/prisma.service';
import { UserService } from '@src/user/user.service';

import { AuthService } from './auth.service';
import { TokenService } from '@src/token/token.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        TokenService,
        UserService,
        PrismaService,
        ConfigService,
        EnvService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
