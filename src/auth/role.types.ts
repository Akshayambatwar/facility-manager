//List of all user roles in the system
export const USER_ROLES = ['ADMIN', 'OPS', 'VIEWER'] as const;
export type UserRole = typeof USER_ROLES[number];