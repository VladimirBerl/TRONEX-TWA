import {
  HomePage,
  DepositPage,
  WithdrawPage,
  NotFoundPage,
  InvitePage,
  BonusPage,
  UpgradePage,
  BannedPage,
  WithdrawHistoryPage,
} from "@/pages";
import { PATHS } from "@/shared/model/navigation.ts";
import { RouteObject } from "react-router-dom";

export const routes: RouteObject[] = [
  { path: PATHS.HOME, element: <HomePage /> },
  { path: PATHS.DEPOSIT, element: <DepositPage /> },
  { path: PATHS.WITHDRAW, element: <WithdrawPage /> },
  { path: PATHS.INVITE, element: <InvitePage /> },
  { path: PATHS.BONUS, element: <BonusPage /> },
  { path: PATHS.UPGRADE, element: <UpgradePage /> },
  { path: PATHS.BANNED, element: <BannedPage /> },
  { path: PATHS.WITHDRAW_HISTORY, element: <WithdrawHistoryPage /> },
  { path: PATHS.NOT_FOUND, element: <NotFoundPage /> },
];
