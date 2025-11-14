import { Navigate } from "react-router-dom";
import { useIsAuthenticated } from "@refinedev/core";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data, isLoading } = useIsAuthenticated();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
