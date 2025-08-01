import { Level } from "@/shared/api/upgrade/types.ts"
import { Button } from "@/shared/ui";
import { MutableRefObject, useRef } from "react";

export const UpgradeTier = ({ level, price, percent }: Level) => {
  const levelRef: MutableRefObject<HTMLButtonElement | null> = useRef<HTMLButtonElement | null>(null);

  const handleBuyLevel = () => {

  };

  return (
    <Button className="w-full" variant="buyLevel" onClick={ handleBuyLevel } ref={ levelRef }>
      <div
        className="flex justify-between w-full border-[2px] border-solid border-[#2D2F33] rounded-[12px] py-1 px-2.5"
      >
        <div className="flex gap-3 items-center">
          <span className="text-medium-strong w-[20px]">{ level }</span>
          <span className="text-white-strong-16">{ Number(price).toFixed() } TON</span>
        </div>

        <span className="text-medium-strong">{ percent } TON/h</span>
      </div>
    </Button>
  );
};
