import { Jwt, JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';

import { Injectable } from '@nestjs/common';
import { EnvService } from '@src/env/env.service';
import { PrismaService } from '@src/prisma/prisma.service';

import { AccessType } from './dto';
import { SelectToken } from './select';

@Injectable()
export class TokenService {
  private readonly issuer: string = 'nestjs-starter';
  constructor(
    private readonly envService: EnvService,
    private readonly prisma: PrismaService,
  ) {}

  public async issueAccessToken(id: string) {
    const signedToken = this.sign({
      id,
      accessType: AccessType.access,
      expiresIn: this.envService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
    });

    if (typeof signedToken !== 'string') {
      throw new Error('Failed to sign access token');
    }
    return signedToken;
  }

  public async issueRefreshToken(id: string) {
    const signedToken = this.sign({
      id,
      accessType: AccessType.refresh,
      expiresIn: this.envService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
    });

    if (typeof signedToken !== 'string') {
      throw new Error('Failed to sign refresh token');
    }

    return await this.prisma.token.upsert({
      select: SelectToken,
      create: {
        id,
        token: signedToken,
      },
      update: {
        token: signedToken,
      },
      where: {
        id,
      },
    });
  }

  private sign({
    id,
    accessType,
    expiresIn,
  }: {
    id: string;
    accessType: AccessType;
    expiresIn: string;
  }) {
    const payload = {
      id,
      accessType,
    };

    const signOptions: SignOptions = {
      expiresIn,
      algorithm: 'HS256',
      issuer: this.issuer,
      jwtid: id,
    };

    return sign(payload, this.envService.get('JWT_SECRET_KEY'), signOptions);
  }

  private verify(token: string): Jwt | JwtPayload | string {
    return verify(token, this.envService.get('JWT_SECRET_KEY'), {
      algorithms: ['HS256'],
      issuer: this.issuer,
    });
  }
}
