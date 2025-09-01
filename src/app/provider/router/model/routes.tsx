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
import { authLoader } from "@/app/provider/loader";

export const routes: RouteObject[] = [
  { path: PATHS.HOME, element: <HomePage /> },
  { path: PATHS.BANNED, element: <BannedPage /> },
  { path: PATHS.DEPOSIT, element: <DepositPage />, loader: authLoader },
  { path: PATHS.INVITE, element: <InvitePage />, loader: authLoader },
  { path: PATHS.BONUS, element: <BonusPage />, loader: authLoader },
  { path: PATHS.UPGRADE, element: <UpgradePage />, loader: authLoader },
  { path: PATHS.WITHDRAW_HISTORY, element: <WithdrawHistoryPage />, loader: authLoader },
  { path: PATHS.DEPOSIT_HISTORY, element: <DepositHistoryPage />, loader: authLoader },
  { path: PATHS.NOT_FOUND, element: <NotFoundPage /> },
];
