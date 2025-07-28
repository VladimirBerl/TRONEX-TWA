import { Page } from '@/shared/ui';
import { UpgradeControl, UpgradeTier } from "@/features";
import { HeaderUpgradeTier } from "@/widgets";
import { upgradeTiers } from "@/features/upgrade/data/dataTiers.ts";

export const UpgradePage = () => {
  return (
    <Page back={ false } className="flex flex-col items-center gap-y-6">
      <h1 className="text-5xl text-[#5c8afa] uppercase font-semibold text-center">Upgrade</h1>
      <UpgradeControl/>

      <section className="w-full">
        <HeaderUpgradeTier/>

        { upgradeTiers.map(({ level, cost, incomePerHour }) => (
          <UpgradeTier
            key={ level }
            level={ level }
            cost={ cost }
            incomePerHour={ incomePerHour }
          />
        )) }
      </section>
    </Page>
  );
};
