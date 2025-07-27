import type { ComponentType } from 'react';

import { NotFoundPage } from '@/pages/404/ui/NotFoundPage.tsx';
import { HomePage } from '@/pages/home';

interface Route {
  path: string;
  Component: ComponentType;
}

export const routes: Route[] = [
  { path: '/', Component: HomePage },
  {
    path: '*',
    Component: NotFoundPage,
  },
];
