import { Dna } from "lucide-react";
import { Button } from "@/shared/ui";

export const UpgradeControl = () => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center pr-2.5">
        <div className="p-3 border-[#47bfe8] border-solid rounded-[12px] border-[2px] mr-2.5">
          <Dna className="rotate-135 w-[58px] h-[58px] stroke-[#47bfe8]"/>
        </div>
        <h2 className="text-[24px] text-[#18A7FB] uppercase font-semibold">Level 1</h2>
      </div>

      <Button
        className="uppercase font-semibold border-solid border-[#47bfe8] border-[1px] tracking-[2px]">Upgrade</Button>
    </div>
  );
};
