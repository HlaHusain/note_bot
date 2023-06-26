import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const ProtectedRoute = ({ children }) => {
  const { isAuthorized } = useAuth();

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }
  return children;
};
