import axios from "axios";
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { Button } from "@/shared/ui";
import { MutableRefObject, useRef, useState } from "react";
import { ReactComponent as Ton } from "@/shared/assets/icons/Ton.svg";

export const SpinningFan = () => {
  const [ currentProgress, setCurrentProgress ] = useState<number>(0);
  const [ isMaxReached, setIsMaxReached ] = useState<boolean>(false);
  const timerRef: MutableRefObject<boolean> = useRef<boolean>(false);

  const API_URL: string = import.meta.env.VITE_API_BASE_URL;

  const handleProgressUpdate = async (): Promise<void> => {
    if (timerRef.current) return;
    timerRef.current = true;

    setTimeout((): boolean => timerRef.current = false, 500);

    if (currentProgress >= 100) {
      setIsMaxReached(true);
      return;
    }

    setCurrentProgress((prev:number) => prev + 10);

    try {
      const response = await axios.patch(`${ API_URL }/api/click`, {
        id_tg: "10",
        clicks: 1,
      });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="relative w-[263px] h-[263px]"
      style={{
        boxShadow: isMaxReached ? "0 0 15px 5px rgba(0, 178, 255, 0.7)" : "none",
        borderRadius: "50%",
      }}
    >
      <CircularProgressbar
        value={currentProgress}
        strokeWidth={2}
        className="w-full h-full"
        styles={buildStyles({
          pathColor: isMaxReached ? "#00B2FF" : "#18A7FB",
          trailColor: isMaxReached ? "#535A64" : "#535A64",
          strokeLinecap: "round",
        })}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <Button
          onClick={ handleProgressUpdate }
          className="p-0 w-[200px] h-[200px] rounded-full bg-transparent hover:bg-transparent cursor-pointer"
        >
          <img
            className="w-full h-full object-cover animate-spin select-none pointer-events-none"
            src="/images/Fan.png"
            alt="Spinning fan"
          />

          <div className="absolute w-[50px] h-[50px] rounded-full bg-[#18A7FB] flex items-center justify-center">
            <Ton className="!w-[60px] !h-[60px] "/>
          </div>
        </Button>
      </div>
    </div>
  );
};
