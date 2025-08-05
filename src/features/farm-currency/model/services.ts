import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { MutableRefObject } from "react";
import { sendClick } from "@/features/farm-currency/model/clickThunk.ts";
import * as React from "react";

interface HandleProgressUpdateArgs {
  setIsMaxReached: React.Dispatch<React.SetStateAction<boolean>>;
  timerRef: MutableRefObject<boolean>;
  clicks_today: number | null;
  id_tg: string | null;
  dispatch: ReturnType<typeof useAppDispatch>;
}

export const handleProgressUpdate = ({
  setIsMaxReached,
  timerRef,
  clicks_today,
  id_tg,
  dispatch,
}: HandleProgressUpdateArgs): void => {
  if (timerRef.current) return;

  timerRef.current = true;
  setTimeout(() => {
    timerRef.current = false;
  }, 200);

  if (clicks_today !== null && clicks_today >= 1000) {
    setIsMaxReached(true);
    return;
  }

  if (id_tg != null) void dispatch(sendClick(id_tg));
};
