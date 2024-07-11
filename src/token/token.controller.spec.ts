import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EnvService } from '@src/env/env.service';
import { PrismaService } from '@src/prisma/prisma.service';

import { TokenController } from './token.controller';
import { TokenService } from './token.service';

describe('TokenController', () => {
  let controller: TokenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokenController],
      providers: [TokenService, PrismaService, EnvService, ConfigService],
    }).compile();

    controller = module.get<TokenController>(TokenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
