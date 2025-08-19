import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Button } from "@/shared/ui";
import { MutableRefObject, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts";
import { handleProgressUpdate } from "@/features/farm-currency/model/services.ts";
import * as React from "react";
import { ReactComponent as SpinnerIcon } from "@/shared/assets/icons/Fan.svg";
import { ReactComponent as TONIcon } from "@/shared/assets/icons/TonLogo.svg";

export const SpinningFan = () => {
  const [isMaxReached, setIsMaxReached] = useState<boolean>(false);
  const timerRef: MutableRefObject<boolean> = useRef<boolean>(false);
  const { id_tg, clicks_today } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  return (
    <>
      <div
        className="relative w-[263px] h-[263px]"
        style={{
          boxShadow: isMaxReached ? "0 0 15px 5px rgba(0, 178, 255, 0.7)" : "none",
          borderRadius: "50%",
        }}
      >
        <CircularProgressbar
          value={((clicks_today ?? 0) / 1000) * 100}
          strokeWidth={3}
          className="w-full h-full"
          styles={buildStyles({
            pathColor: isMaxReached ? "#00B2FF" : "#18A7FB",
            trailColor: isMaxReached ? "#001735" : "#001735",
            strokeLinecap: "round",
          })}
        />

        <div
          className={`${isMaxReached ? "pointer-events-none" : "pointer-events-auto"} absolute inset-0 flex items-center justify-center`}
        >
          <Button
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              void handleProgressUpdate({
                e,
                setIsMaxReached,
                timerRef,
                clicks_today,
                id_tg,
                dispatch,
              })
            }
            className="!p-0 w-[220px] h-[220px] rounded-full bg-transparent hover:bg-transparent cursor-pointer"
          >
            <SpinnerIcon className="select-none pointer-events-none animate-spin" />

            <div className="absolute  rounded-full bg-[#18A7FB] flex items-center justify-center">
              <TONIcon />
            </div>
          </Button>
        </div>
      </div>
    </>
  );
};
