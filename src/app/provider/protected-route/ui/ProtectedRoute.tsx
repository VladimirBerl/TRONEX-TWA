import { useAppSelector, useRequiredContext } from "@/shared/hooks";
import { AuthContext } from "@/app/provider/auth-provider/ui/AuthProvider.tsx";
import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { PATHS } from "@/shared/config/navigation.ts";
import { RootState } from "@/app/store/store.ts";

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { status } = useAppSelector((state: RootState) => state.user);
  const { token } = useRequiredContext(AuthContext);
  const location = useLocation();

  if (!token) return <Navigate to={PATHS.HOME} replace />;

  if (status === "banned" && location.pathname !== PATHS.BANNED) {
    return <Navigate to={PATHS.BANNED} replace />;
  }

  if (status !== "banned" && location.pathname === PATHS.BANNED) {
    return <Navigate to={PATHS.HOME} replace />;
  }

  return <>{children}</>;
};
