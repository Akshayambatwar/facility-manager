import RoleSwitcher from './RoleSwitcher';

export function Header() {
  return (
    <header
      className="
        flex items-center justify-between
        border-b bg-white
        px-4 py-2
      "
    >
      <div className="flex items-center">
        <span className="text-sm font-semibold text-gray-800">
          Facility Manager
        </span>
      </div>

      <div className="flex items-center">
        <RoleSwitcher />
      </div>
    </header>
  );
}
