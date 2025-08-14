import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { MutableRefObject } from "react";
import { sendClick } from "@/features/farm-currency/model/clickThunk.ts";
import * as React from "react";

interface HandleProgressUpdateArgs {
  e: React.MouseEvent<HTMLButtonElement>;
  setIsMaxReached: React.Dispatch<React.SetStateAction<boolean>>;
  timerRef: MutableRefObject<boolean>;
  clicks_today: number | null;
  id_tg: string | null;
  dispatch: ReturnType<typeof useAppDispatch>;
}

const showFloatingText = (e: React.MouseEvent, text: string): void => {
  const div: HTMLDivElement = document.createElement("div");
  div.style.position = "absolute";
  div.style.zIndex = "1000";
  div.style.color = "#18A7FB";
  div.style.fontWeight = "bold";
  div.style.fontSize = "20px";
  div.style.pointerEvents = "none";
  div.textContent = text;

  const container = document.querySelector(".relative") as HTMLElement;
  if (!container) return;
  container.appendChild(div);

  const rect: DOMRect = container.getBoundingClientRect();
  div.style.left = `${e.clientX - rect.left}px`;
  div.style.top = `${e.clientY - rect.top}px`;

  div.style.transition = "all 1s ease-out";
  div.style.transform = "translateY(0)";
  div.style.opacity = "1";

  setTimeout(() => {
    div.style.transform = "translateY(-30px)";
    div.style.opacity = "0";
  }, 0);

  setTimeout(() => div.remove(), 1000);
};

export const handleProgressUpdate = ({
  e,
  setIsMaxReached,
  timerRef,
  clicks_today,
  id_tg,
  dispatch,
}: HandleProgressUpdateArgs): void => {
  if (timerRef.current) return;

  showFloatingText(e, "tap");

  timerRef.current = true;
  setTimeout(() => {
    timerRef.current = false;
  }, 200);

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
