import { Page } from "@/shared/ui";
import { UpgradeControl, UpgradeTier } from "@/features";
import { HeaderUpgradeTier, MobileNavBar } from "@/widgets";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useGetLevelsQuery, useUpgradeLevelMutation } from "@/shared/api/api.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { LevelInfo } from "@/shared/types/levels.ts";
import { useAppDispatch } from "@/shared/hooks";
import { setNewLevel } from "@/entities/user/model/userSlice.ts";

export const UpgradePage = () => {
  const { t } = useTranslation();
  const [isBalanceInsufficient, setIsBalanceInsufficient] = useState(false);
  const { level, id_tg, investment_balance } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { data: levels } = useGetLevelsQuery(id_tg!);
  const [upgradeLevel] = useUpgradeLevelMutation();

  const handleUpgradeLevel = () => {
    const price: number = Math.round(parseFloat(levels?.[0].price ?? "0"));

    if (id_tg != null && levels != null) {
      upgradeLevel(id_tg)
        .unwrap()
        .then(() => {
          const updatedLevels: LevelInfo[] = levels.slice(1);

          const newLevel = level + 1;
          const newBalance = (parseFloat(investment_balance) - price).toString();

          dispatch(setNewLevel({ newLevel, newBalance }));

          return {
            updatedLevels,
            newLevel,
            newBalance,
          };
        })
        .catch((error) => {
          setIsBalanceInsufficient(true);
          console.error(error);
        });
      setIsBalanceInsufficient(false);
    }
  };

  return (
    <Page className="flex flex-col h-screen relative">
      <h1 className="text-title leading-none text-center mb-[24px]">{t("upgrade.title")}</h1>

      <main className="flex-1 grid grid-col-[auto_auto_auto] gap-y-6">
        <UpgradeControl
          handleUpgradeLevel={(): undefined => void handleUpgradeLevel()}
          isBalanceInsufficient={isBalanceInsufficient}
        />

        <section className="w-full min-h-[200px]">
          <HeaderUpgradeTier />

          <div className="py-3">
            {levels?.map(({ level, price, percent }: LevelInfo, index: number) => (
              <UpgradeTier
                key={level}
                level={level}
                price={price}
                percent={percent}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>

      <div className="sticky bottom-0 w-full">
        <MobileNavBar page="/" />
      </div>
    </Page>
  );
};
