import { useAppSelector } from "@/shared/hooks";
import { Navigate, Outlet } from "react-router-dom";
import { PATHS } from "@/shared/config/navigation.ts";

export const ProtectedRoute = () => {
  const { id_tg, status } = useAppSelector((state) => state.user);

  if (status === "banned") return <Navigate to={PATHS.BANNED} replace />;
  if (!id_tg || status !== "active") return <Navigate to={PATHS.HOME} replace />;

  return <Outlet />;
};
