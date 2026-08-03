import { Navigate } from "react-router-dom";

import { ROUTES } from "@/constants/routes";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export default function ProtectedRoute({
  isAuthenticated,
  children,
}: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
}