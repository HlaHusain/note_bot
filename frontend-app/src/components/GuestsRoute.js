import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const GuestsRoute = ({ children }) => {
  const { isAuthorized } = useAuth();

  if (isAuthorized) {
    return <Navigate to="/notes" />;
  }
  return children;
};
