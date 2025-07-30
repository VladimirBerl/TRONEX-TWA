import { Page } from '@/shared/ui';
import { UpgradeControl, UpgradeTier } from "@/features";
import { HeaderUpgradeTier } from "@/widgets";
import { upgradeTiers } from "@/features/upgrade/data/dataTiers.ts";
import { useTranslation } from "react-i18next";

export const UpgradePage = () => {
  const { t } = useTranslation()

  return (
    <Page className="flex flex-col items-center gap-y-6">
      <h1 className="text-title leading-none text-center">{ t("upgrade.title") }</h1>
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
