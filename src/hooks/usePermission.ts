import { PERMISSIONS, type Permission } from '@/auth/access.control';
import { useRole } from '@/hooks/useRole';

export const usePermission = (permission: Permission) => {
  const { role } = useRole();
  return PERMISSIONS[role].includes(permission);
};
