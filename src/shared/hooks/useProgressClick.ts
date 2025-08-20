import { useState, useRef, useCallback } from "react";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch";
import { sendClick } from "@/features/spinning-fan/model/clickThunk";
import * as React from "react";

const MAX_CLICKS = 1000;

export const useProgressClick = (id_tg: string | null, clicks_today: number | null) => {
  const [isMaxReached, setIsMaxReached] = useState(false);
  const timerRef = useRef(false);
  const dispatch = useAppDispatch();

  const showFloatingText = (e: React.MouseEvent, text: string) => {
    const div = document.createElement("div");
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

    const rect = container.getBoundingClientRect();
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

  const handleProgressUpdate = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (timerRef.current) return;

      showFloatingText(e, "tap");

      timerRef.current = true;
      setTimeout(() => {
        timerRef.current = false;
      }, 200);

      if (clicks_today !== null && clicks_today >= MAX_CLICKS) {
        setIsMaxReached(true);
        return;
      }

      if (id_tg != null) void dispatch(sendClick(id_tg));
    },
    [clicks_today, id_tg, dispatch, showFloatingText],
  );

  const progress = ((clicks_today ?? 0) / MAX_CLICKS) * 100;

  return {
    handleProgressUpdate,
    isMaxReached,
    progress,
  };
};
