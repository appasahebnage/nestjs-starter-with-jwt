import { z } from 'zod';

import { CreateUserRequestDto } from '@src/user/dto';

export const SignInRequestDto = CreateUserRequestDto.pick({
  email: true,
  password: true,
});
export type SignInRequestDto = z.infer<typeof SignInRequestDto>;
