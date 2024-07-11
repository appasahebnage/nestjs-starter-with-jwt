import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt-strategy';
import { UserModule } from '@src/user/user.module';

@Module({
  providers: [JwtStrategy],
  exports: [JwtStrategy],
  imports: [UserModule],
})
export class JwtModule {}
