import { SampleCommand } from './commands/sample.command';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from './env/env.module';
import { EnvVarsZodSchema } from './env/env-vars-zod-schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => EnvVarsZodSchema.parse(env),
      isGlobal: true, // no need to import into other modules
    }),
    EnvModule,
  ],
  providers: [SampleCommand, Logger],
})
export class CliModule {}
