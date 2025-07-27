import type { ComponentType } from 'react';

import { AppShell } from "@/app/AppShell.tsx";
import { NotFoundPage } from "@/pages/404/ui/NotFoundPage.tsx";

interface Route {
  path: string;
  Component: ComponentType;
}

export const routes: Route[] = [
  { path: '/', Component: AppShell },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
