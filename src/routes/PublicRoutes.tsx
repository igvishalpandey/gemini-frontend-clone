import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import type { RootState } from '../store';

const PublicRoutes = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isLoggedIn)

    return isAuthenticated ? <Navigate to="/dashboard" /> : <Outlet />;
}

export default PublicRoutes