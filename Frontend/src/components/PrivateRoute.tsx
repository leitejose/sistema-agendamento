import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { authToken } = useAuth();

  if (!authToken) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;