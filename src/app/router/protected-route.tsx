import { useAuthStore } from "@/stores/auth.store";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export function ProtectedRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
