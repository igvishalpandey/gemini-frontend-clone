import { LogoutButton, ThemeToggler } from "../../";

const Navbar = () => {
  return (
    <nav className="w-full bg-white dark:bg-zinc-900 shadow-md dark:shadow-black/30 px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
          Vishal Pandey
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggler />
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
