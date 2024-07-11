import { Prisma } from '@prisma/client';

export const SelectToken = Prisma.validator<Prisma.TokenSelect>()({
  id: true,
  token: true,
  createdAt: true,
  updatedAt: true,
});
