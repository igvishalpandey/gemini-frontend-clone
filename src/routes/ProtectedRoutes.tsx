import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../store";

const ProtectedRoutes = () => {
  const isAuthenticated = useSelector((state: RootState)=>state.auth.isLoggedIn)

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes