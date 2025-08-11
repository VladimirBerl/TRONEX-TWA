import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Button } from "@/shared/ui";
import { MutableRefObject, useRef, useState } from "react";
import { ReactComponent as Ton } from "@/shared/assets/icons/Ton.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts";
import { handleProgressUpdate } from "@/features/farm-currency/model/services.ts";

export const SpinningFan = () => {
  const [isMaxReached, setIsMaxReached] = useState<boolean>(false);
  const timerRef: MutableRefObject<boolean> = useRef<boolean>(false);
  const { id_tg, clicks_today } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  return (
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
          trailColor: isMaxReached ? "#444444" : "#444444",
          strokeLinecap: "round",
        })}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          onClick={() =>
            void handleProgressUpdate({
              setIsMaxReached,
              timerRef,
              clicks_today,
              id_tg,
              dispatch,
            })
          }
          className="p-0 w-[200px] h-[200px] rounded-full bg-transparent hover:bg-transparent cursor-pointer"
        >
          <img
            className="w-full h-full object-cover animate-spin select-none pointer-events-none"
            src="/images/Fan.png"
            alt="Spinning fan"
          />

          <div className="absolute w-[50px] h-[50px] rounded-full bg-[#18A7FB] flex items-center justify-center">
            <Ton className="!w-[60px] !h-[60px] " />
          </div>
        </Button>
      </div>
    </div>
  );
};
