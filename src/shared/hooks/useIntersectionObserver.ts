import { useEffect, useRef } from "react";
import { useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import * as React from "react";

export interface handleGetItemsArgs {
  id_tg: string;
  page: number;
}

interface useIntersectionObserverProps<U> {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  enabled?: boolean;
  total: number;
  items: U[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handleGetItems: (args: handleGetItemsArgs) => void;
}

export const useIntersectionObserver = <T extends Element, U>({
  root = null,
  rootMargin = "0px",
  threshold = 0.5,
  enabled = true,
  total,
  items,
  handleGetItems,
  setPage,
}: useIntersectionObserverProps<U>) => {
  const targetRef = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const { id_tg } = useAppSelector((state: RootState) => state.user);

  const loadMore = () => {
    setPage((prevPage: number): number => {
      const newPage: number = prevPage + 1;
      if (id_tg && items.length < total) {
        handleGetItems({ id_tg, page: newPage });
      }
      return newPage;
    });
  };

  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            loadMore();
          }
        });
      },
      { root, rootMargin, threshold },
    );

    observerRef.current.observe(targetRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [root, rootMargin, threshold, enabled, items.length]);

  return targetRef;
};
