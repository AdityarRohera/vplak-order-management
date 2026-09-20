import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface RoleRouteProps {
  allowedRole: "admin" | "customer";
}

const RoleRoute = ({ allowedRole }: RoleRouteProps) => {
  const { token, role } = useAuth();

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role
  if (role !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleRoute;