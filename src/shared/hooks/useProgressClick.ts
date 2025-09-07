import { useRef, useCallback } from "react";
import * as React from "react";
import { useSendClickMutation } from "@/shared/api/api.ts";
import { FarmClickData } from "@/shared/types/user.ts";

const MAX_CLICKS = 1000;

export const useProgressClick = (id_tg: string | null, clicks_today: number | null) => {
  const timerRef = useRef(false);
  const [sendClick] = useSendClickMutation();

  const isMaxReached = (clicks_today ?? 0) >= MAX_CLICKS;

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
      if (timerRef.current || isMaxReached) return;

      showFloatingText(e, "tap");

      timerRef.current = true;
      setTimeout(() => {
        timerRef.current = false;
      }, 200);

      if (!id_tg) return;

      sendClick(id_tg)
        .unwrap()
        .then((data: FarmClickData) => {
          const { farm_balance, clicks_today, reward_added } = data;
          const round6 = (n: number) => parseFloat(n.toFixed(6));

          return {
            farm_balance: round6(parseFloat(farm_balance)),
            clicks_today,
            reward_added,
          };
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [clicks_today, id_tg, showFloatingText],
  );

  const progress = ((clicks_today ?? 0) / MAX_CLICKS) * 100;

  return {
    handleProgressUpdate,
    isMaxReached,
    progress,
  };
};
