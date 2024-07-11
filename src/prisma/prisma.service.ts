import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { EnvService } from '@src/env/env.service';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(readonly envService: EnvService) {
    super({
      datasources: {
        db: {
          url: envService.get('DATABASE_URL'),
        },
      },
    });
  }

  cleanDatabase() {
    return this.$transaction([this.token.deleteMany(), this.user.deleteMany()]);
  }
}
