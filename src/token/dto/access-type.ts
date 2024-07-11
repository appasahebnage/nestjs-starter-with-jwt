export const AccessType = {
  access: 'access',
  refresh: 'refresh',
} as const;

export type AccessType = (typeof AccessType)[keyof typeof AccessType];
