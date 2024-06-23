import { Global, Module } from '@nestjs/common';

import { EnvService } from './env.service';

@Global() // optional, but recommended
@Module({
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
