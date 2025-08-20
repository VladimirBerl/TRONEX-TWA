import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Button } from "@/shared/ui";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { useProgressClick } from "@/shared/hooks";
import { ReactComponent as SpinnerIcon } from "@/shared/assets/icons/Fan.svg";
import { ReactComponent as TONIcon } from "@/shared/assets/icons/TonLogo.svg";

export const SpinningFan = () => {
  const { id_tg, clicks_today = 0 } = useSelector((state: RootState) => state.user);
  const { handleProgressUpdate, isMaxReached, progress } = useProgressClick(id_tg, clicks_today);

  const progressStyles = useMemo(
    () =>
      buildStyles({
        pathColor: isMaxReached ? "#00B2FF" : "#18A7FB",
        trailColor: "#001735",
        strokeLinecap: "round",
      }),
    [isMaxReached],
  );

  return (
    <div
      className="relative w-[263px] h-[263px]"
      style={{
        boxShadow: isMaxReached ? "0 0 15px 5px rgba(0, 178, 255, 0.7)" : "none",
        borderRadius: "50%",
      }}
    >
      <CircularProgressbar
        value={progress}
        strokeWidth={3}
        className="w-full h-full"
        styles={progressStyles}
      />

      <div
        className={`${isMaxReached ? "pointer-events-none" : "pointer-events-auto"} absolute inset-0 flex items-center justify-center`}
      >
        <Button
          onClick={handleProgressUpdate}
          className="!p-0 w-[220px] h-[220px] rounded-full bg-transparent hover:bg-transparent cursor-pointer"
        >
          <SpinnerIcon className="select-none pointer-events-none animate-spin" />

          <div className="absolute rounded-full bg-[#18A7FB] flex items-center justify-center">
            <TONIcon />
          </div>
        </Button>
      </div>
    </div>
  );
};
