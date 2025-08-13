import AppRoutes from "./routes/AppRoutes";
import { Navbar } from "./components";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />

      <Navbar />
      <AppRoutes />
    </>
  );
};

export default App;
