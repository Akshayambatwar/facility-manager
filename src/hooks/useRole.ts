import { useContext } from 'react';
import { RoleContext, type RoleContextValue } from '@/auth/role.context';

export const useRole = (): RoleContextValue => {

  // Get the role context
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used inside RoleProvider');
  }
  return context;
};
