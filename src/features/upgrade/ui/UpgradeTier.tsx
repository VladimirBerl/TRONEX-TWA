interface UpgradeTierProps {
  level: number;
  cost: string;
  incomePerHour: string;
}

export const UpgradeTier = ({ level, cost, incomePerHour }: UpgradeTierProps) => {
  return (
    <div className="w-full mb-2">
      <div
        className="flex justify-between w-full border-[2px] border-solid border-[#2D2F33] rounded-[12px] py-1 px-2.5 mt-2"
      >
        <div className="flex gap-3 items-center">
          <span className="text-medium-strong w-[20px]">{ level }</span>
          <span className="text-white-strong-16 w-[80px] text-end">{ cost }</span>
        </div>

        <span className="text-medium-strong">{ incomePerHour }</span>
      </div>
    </div>

  );
};
