import { useIsAuthenticated } from "@refinedev/core";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const { isLoading, data: isAuthenticated } = useIsAuthenticated();

  if (isLoading) {
    return <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>Loading...</div>;
  }

  if (!isAuthenticated?.success) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
