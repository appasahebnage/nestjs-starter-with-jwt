import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvVarsZodSchema } from './env/env-vars-zod-schema';
import { EnvModule } from './env/env.module';
import { EnvService } from './env/env.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { TokenModule } from './token/token.module';
import { JwtModule } from './jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => EnvVarsZodSchema.parse(env),
      isGlobal: true, // no need to import into other modules
    }),
    EnvModule,
    AuthModule,
    UserModule,
    PrismaModule,
    HealthModule,
    TokenModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService, EnvService],
})
export class AppModule {}
