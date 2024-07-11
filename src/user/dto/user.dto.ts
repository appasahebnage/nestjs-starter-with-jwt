import { z } from 'zod';

export const User = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  companyName: z.string(),
  passwordHash: z.string(),
  updatedAt: z.string(),
  passwordSalt: z.string(),
  createdAt: z.string(),
});

export type User = z.infer<typeof User>;

export const UserDto = User.pick({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  companyName: true,
  createdAt: true,
  updatedAt: true,
});

export type UserDto = z.infer<typeof UserDto>;
