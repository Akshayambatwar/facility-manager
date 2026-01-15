
//List of all permissions available in the system
export type Permission =
  | 'FACILITY_CREATE'
  | 'FACILITY_EDIT'
  | 'FACILITY_DELETE'
  | 'FACILITY_VIEW';


import type { UserRole } from './role.types';

export const PERMISSIONS: Record<UserRole, readonly Permission[]> = {

  // Admin users have all permissions
  ADMIN: [
    'FACILITY_CREATE',
    'FACILITY_EDIT',
    'FACILITY_DELETE',
    'FACILITY_VIEW',
  ],
  // Operations users have limited permission
  OPS: ['FACILITY_VIEW'],

  // VIEWER is read-only
  VIEWER: ['FACILITY_VIEW']
};
