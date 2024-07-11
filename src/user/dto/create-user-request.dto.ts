import { z } from 'zod';
import { User } from './user.dto';

export const CreateUserRequestDto = User.pick({
  email: true,
  firstName: true,
  lastName: true,
  companyName: true,
}).extend({
  password: z.string(),
});

export type CreateUserRequestDto = z.infer<typeof CreateUserRequestDto>;
