import { z } from 'zod';

export const EnvVarsZodSchema = z.object({
  NO_COLOR: z.string().optional(),
  NODE_ENV: z.enum(['local', 'test', 'dev', 'stage', 'prod']),
  PORT: z.string().default('8081'),
  WORKERS: z.string().optional(),
});

export type EnvVarsZodSchema = z.infer<typeof EnvVarsZodSchema>;
