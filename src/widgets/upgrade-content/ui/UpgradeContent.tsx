import { UpgradeControl, UpgradeTier } from "@/features";
import { HeaderUpgradeTier } from "@/widgets";
import { useUpgradeLevel } from "@/shared/hooks";
import { LevelInfo } from "@/shared/types/levels.ts";

export const UpgradeContent = () => {
  const { levels, handleUpgradeLevel, isBalanceInsufficient } = useUpgradeLevel();

  return (
    <main className="flex-1 grid grid-col-[auto_auto_auto] gap-y-6">
      <UpgradeControl
        handleUpgradeLevel={handleUpgradeLevel}
        isBalanceInsufficient={isBalanceInsufficient}
      />

      <section className="w-full min-h-[200px]">
        <HeaderUpgradeTier />

        <div className="py-3">
          {levels?.map(({ level, price, percent }: LevelInfo, index) => (
            <UpgradeTier key={level} level={level} price={price} percent={percent} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
};
