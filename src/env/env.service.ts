import { EnvVarsZodSchema } from './env-vars-zod-schema';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  constructor(private configService: ConfigService<EnvVarsZodSchema, true>) {}
  get<T extends keyof EnvVarsZodSchema>(key: T) {
    return this.configService.get(key, { infer: true });
  }
}
