import { z } from 'zod';

export const EnvVarsZodSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET_KEY: z.string(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: z.string(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: z.string(),
  NO_COLOR: z.string().optional(),
  NODE_ENV: z.enum(['local', 'test', 'dev', 'stage', 'prod']),
  PORT: z.string().default('8081'),
  WORKERS: z.string().optional(),
});

export type EnvVarsZodSchema = z.infer<typeof EnvVarsZodSchema>;
