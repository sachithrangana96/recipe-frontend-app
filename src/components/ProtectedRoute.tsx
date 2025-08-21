import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // Correctly redirects to the login page without a full page reload.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // If a token exists, render the protected content.
  return children;
};

export default ProtectedRoute;