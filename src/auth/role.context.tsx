import { createContext } from 'react';
import type { UserRole } from './role.types';

export type RoleContextValue = {
  role: UserRole;
  setRole: (role: UserRole) => void;
};

export const RoleContext = createContext<RoleContextValue | undefined>(
  undefined
);
