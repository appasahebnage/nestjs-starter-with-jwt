import { z } from 'zod';
import { User } from './user.dto';

export const CreateUserResponseDto = User.pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  companyName: true,
  createdAt: true,
  updatedAt: true,
});

export type CreateUserResponseDto = z.infer<typeof CreateUserResponseDto>;
