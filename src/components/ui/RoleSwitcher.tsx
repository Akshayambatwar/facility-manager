import { useRole } from '@/hooks/useRole';
import { USER_ROLES, type UserRole } from '@/auth/role.types';

const RoleSwitcher = () => {
  const { role, setRole } = useRole();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as UserRole);
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <label
        htmlFor="role-switcher"
        className="text-gray-600 font-medium"
      >
        Role
      </label>

      <select
        id="role-switcher"
        value={role}
        onChange={handleChange}
        className="
          rounded border border-gray-300 px-2 py-1
          text-sm bg-white
          cursor-pointer
          outline-none
          focus:ring-1 focus:ring-blue-500
        "
      >
        {USER_ROLES.map((roleOption) => (
          <option key={roleOption} value={roleOption}>
            {roleOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleSwitcher;
