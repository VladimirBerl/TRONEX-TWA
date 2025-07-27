import type { ComponentType } from 'react';

import { HomePage } from '@/pages/home';

interface Route {
  path: string;
  Component: ComponentType;
}

export const routes: Route[] = [
  { path: '/', Component: HomePage },
  {
    path: '*',
    Component: () => <div>404</div>,
  },
];
