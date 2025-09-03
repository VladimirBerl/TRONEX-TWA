import { Button } from "@/shared/ui";
import { LevelInfo } from "@/shared/types/levels.ts";

interface UpgradeTierProps {
  index: number;
}

export const UpgradeTier = ({ level, price, percent }: UpgradeTierProps & LevelInfo) => {
  return (
    <Button className="w-full" variant="buyLevel">
      <div className="flex justify-between w-full border-[2px] border-solid border-[#2D2F33] rounded-[12px] py-1 px-2.5">
        <div className="flex gap-3 items-center">
          <span className="text-medium-strong w-[20px]">{level}</span>
          <span className="text-white-strong-16">{Number(price).toFixed()} TON</span>
        </div>

        <span className="text-medium-strong">{percent} TON/24h</span>
      </div>
    </Button>
  );
};
