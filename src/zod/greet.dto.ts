import { z } from 'zod';

export const GreetDto = z.object({
  message: z.string(),
});

export type GreetDto = z.infer<typeof GreetDto>;
