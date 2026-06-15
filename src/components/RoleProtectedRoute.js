import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoleProtectedRoute({ children, allowedRole }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== allowedRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default RoleProtectedRoute;