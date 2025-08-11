import AppRoutes from "./routes/AppRoutes";
import { LogoutButton, ThemeToggler } from "./components";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="p-4 flex justify-end gap-4">
        <ThemeToggler />
        <LogoutButton />
      </div>
      <AppRoutes />
    </>
  );
};

export default App;
