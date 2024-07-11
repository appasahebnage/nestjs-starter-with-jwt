import { Prisma } from '@prisma/client';

export const SelectUser = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  email: true,
  firstName: true,
  lastName: true,
  companyName: true,
  createdAt: true,
  updatedAt: true,
});
