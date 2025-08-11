import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/Slices/authSlice";
import type { RootState } from "../../../store";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isLoggedIn
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 hover:cursor-pointer"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
