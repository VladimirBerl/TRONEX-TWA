import { useEffect, useRef } from "react";

interface useIntersectionObserverProps {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  enabled?: boolean;
  onIntersect: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;
}

export const useIntersectionObserver = <T extends Element>({
  root = null,
  rootMargin = "0px",
  threshold = 0.5,
  enabled = true,
  onIntersect,
}: useIntersectionObserverProps) => {
  const targetRef = useRef<T | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!enabled || !targetRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onIntersect(entry, observer);
          }
        });
      },
      { root, rootMargin, threshold },
    );

    observerRef.current.observe(targetRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [root, rootMargin, threshold, enabled, onIntersect]);

  return targetRef;
};
