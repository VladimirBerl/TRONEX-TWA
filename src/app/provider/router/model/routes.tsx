import type { ComponentType } from 'react';

import { HomePage, DepositPage, WithdrawPage, NotFoundPage, InvitePage, BonusPage, UpgradePage } from "@/pages";
import { PATHS } from "@/shared/model/navigation.ts";

interface Route {
  path: string;
  Component: ComponentType;
}

export const routes: Route[] = [
  {
    path: PATHS.HOME,
    Component: HomePage,
  },

  {
    path: PATHS.DEPOSIT,
    Component: DepositPage,
  },

  {
    path: PATHS.WITHDRAW,
    Component: WithdrawPage,
  },

  {
    path: PATHS.INVITE,
    Component: InvitePage,
  },

  {
    path: PATHS.BONUS,
    Component: BonusPage,
  },

  {
    path: PATHS.UPGRADE,
    Component: UpgradePage,
  },

  {
    path: PATHS.NOT_FOUND,
    Component: NotFoundPage,
  },
];
