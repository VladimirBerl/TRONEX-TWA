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
// import { ProtectedRoute } from "@/app/provider/protected-route";
import { PATHS } from "@/shared/config/navigation.ts";
import { RouteObject } from "react-router-dom";
import { authLoader } from "@/app/provider/loader";

export const routes: RouteObject[] = [
  { path: PATHS.HOME, element: <HomePage /> },
  { path: PATHS.BANNED, element: <BannedPage /> },
  { path: PATHS.DEPOSIT, element: <DepositPage />, loader: authLoader },
  { path: PATHS.INVITE, element: <InvitePage /> },
  { path: PATHS.BONUS, element: <BonusPage /> },
  { path: PATHS.UPGRADE, element: <UpgradePage /> },
  { path: PATHS.WITHDRAW_HISTORY, element: <WithdrawHistoryPage /> },
  { path: PATHS.DEPOSIT_HISTORY, element: <DepositHistoryPage /> },
  { path: PATHS.NOT_FOUND, element: <NotFoundPage /> },
];
// {
//   element: <ProtectedRoute />,
//     children: [
//   { path: PATHS.HOME, element: <HomePage /> },
//   { path: PATHS.BANNED, element: <BannedPage /> },
//   { path: PATHS.DEPOSIT, element: <DepositPage /> },
//   { path: PATHS.INVITE, element: <InvitePage /> },
//   { path: PATHS.BONUS, element: <BonusPage /> },
//   { path: PATHS.UPGRADE, element: <UpgradePage /> },
//   { path: PATHS.WITHDRAW_HISTORY, element: <WithdrawHistoryPage /> },
//   { path: PATHS.DEPOSIT_HISTORY, element: <DepositHistoryPage /> },
//   { path: PATHS.NOT_FOUND, element: <NotFoundPage /> },
// ],
// },
