import { useState } from 'react';
import type { UserRole } from './role.types';
import { RoleContext } from './role.context';

export const RoleProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<UserRole>('ADMIN');

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};
