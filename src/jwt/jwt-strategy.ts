import { UserService } from '@src/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { EnvService } from '@src/env/env.service';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly env: EnvService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: env.get('JWT_SECRET_KEY'),
    });
  }

  async validate(payload: JwtPayload) {
    const { id, accessType, exp } = payload;

    if (!(id && accessType && accessType === 'access' && exp)) {
      throw new UnauthorizedException();
    }

    if (await this.isTokenExpired(exp)) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.getUserById(id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async isTokenExpired(expiryTimestamp: number): Promise<boolean> {
    const currentTime = Date.now(); // Current time in milliseconds
    const expiryTime = expiryTimestamp * 1000; // Convert to milliseconds

    return currentTime >= expiryTime;
  }
}
