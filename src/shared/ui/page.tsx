'use client';

import { backButton, hapticFeedback } from '@telegram-apps/sdk-react';
import { PropsWithChildren, useEffect } from 'react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';

interface PageProps extends PropsWithChildren {
  className?: string;
  back?: boolean;
}

export const Page = (props: PageProps) => {
  const { children, back = true, className } = props;

  const router = useNavigate();

  useEffect(() => {
    if (backButton.isSupported()) {
      if (back) {
        backButton.show();
      } else {
        backButton.hide();
      }
    }
  }, [ back ]);

  useEffect((): void => {
    if (backButton.isSupported()) {
      void backButton.onClick((): void => {
        if (hapticFeedback.isSupported()) {
          void hapticFeedback.impactOccurred('light');
        }
        void router(-1);
      });
    }
  }, [router]);

  return <section className={ cn('min-h-full', className) }>{ children }</section>;
};
