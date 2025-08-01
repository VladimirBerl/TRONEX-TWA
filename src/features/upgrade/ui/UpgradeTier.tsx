import { Level } from "@/shared/api/upgrade/types.ts"

export const UpgradeTier = ({ level, price, percent }: Level) => {
  return (
    <div className="w-full mb-2">
      <div
        className="flex justify-between w-full border-[2px] border-solid border-[#2D2F33] rounded-[12px] py-1 px-2.5 mt-2"
      >
        <div className="flex gap-3 items-center">
          <span className="text-medium-strong w-[20px]">{ level }</span>
          <span className="text-white-strong-16">{ Number(price).toFixed() } TON</span>
        </div>

        <span className="text-medium-strong">{ percent } TON/h</span>
      </div>
    </div>
  );
};
