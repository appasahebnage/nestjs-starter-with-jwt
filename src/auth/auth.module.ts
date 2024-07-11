import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '@src/user/user.module';
import { TokenModule } from '@src/token/token.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [UserModule, TokenModule],
})
export class AuthModule {}
