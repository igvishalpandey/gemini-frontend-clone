import { Routes, Route, Navigate } from "react-router-dom";
import { ChatRoom, Dashboard, Login, Signup } from "../pages";
import { ROUTES } from "../constant";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PublicRoutes />}>
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.SIGNUP} element={<Signup />} />
            </Route>

            <Route element={<ProtectedRoute />}>
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTES.CHAT} element={<ChatRoom />} />
            </Route>

            <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />

            <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>

    );
};

export default AppRoutes;
