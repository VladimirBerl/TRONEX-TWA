import {
  HomePage,
  DepositPage,
  NotFoundPage,
  InvitePage,
  BonusPage,
  UpgradePage,
  BannedPage,
  WithdrawHistoryPage,
  DepositHistoryPage,
} from "@/pages";
import { PATHS } from "@/shared/config/navigation.ts";
import { RouteObject } from "react-router-dom";
import { ProtectedRoute } from "@/app/provider/protected-route";

export const routes: RouteObject[] = [
  {
    path: PATHS.HOME,
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: PATHS.BANNED,
    element: (
      <ProtectedRoute>
        <BannedPage />
      </ProtectedRoute>
    ),
  },
  {
    path: PATHS.DEPOSIT,
    element: (
      <ProtectedRoute>
        <DepositPage />
      </ProtectedRoute>
    ),
  },
  {
    path: PATHS.INVITE,
    element: (
      <ProtectedRoute>
        <InvitePage />
      </ProtectedRoute>
    ),
  },
  {
    path: PATHS.BONUS,
    element: (
      <ProtectedRoute>
        <BonusPage />
      </ProtectedRoute>
    ),
  },
  {
    path: PATHS.UPGRADE,
    element: (
      <ProtectedRoute>
        <UpgradePage />
      </ProtectedRoute>
    ),
  },
  {
    path: PATHS.WITHDRAW_HISTORY,
    element: (
      <ProtectedRoute>
        <WithdrawHistoryPage />
      </ProtectedRoute>
    ),
  },
  {
    path: PATHS.DEPOSIT_HISTORY,
    element: (
      <ProtectedRoute>
        <DepositHistoryPage />
      </ProtectedRoute>
    ),
  },
  { path: PATHS.NOT_FOUND, element: <NotFoundPage /> },
];
