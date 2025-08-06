import { Page } from "@/shared/ui";
import { UpgradeControl, UpgradeTier } from "@/features";
import { HeaderUpgradeTier } from "@/widgets";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Level } from "@/shared/api/upgrade/types.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts";
import { upgradeLevel } from "@/features/upgrade-level/model/upgradeLevelThunk.ts";
import { getLevels } from "@/features/levels/model/levelsThunk.ts";

export const UpgradePage = () => {
  const { t } = useTranslation();
  const [isBalanceInsufficient, setIsBalanceInsufficient] = useState<boolean>(false);
  const { level, id_tg, investment_balance } = useSelector((state: RootState) => state.user);
  const { levels } = useSelector((state: RootState) => state.levels);
  const dispatch = useAppDispatch();

  const handleUpgradeLevel = async (): Promise<void> => {
    const price: number = Math.round(parseFloat(levels?.[0].price ?? "0"));

    if (investment_balance >= price) {
      if (id_tg != null && levels != null) {
        const resultAction = await dispatch(
          upgradeLevel({ id_tg, levels, level, price, investment_balance }),
        );
        if (upgradeLevel.rejected.match(resultAction)) {
          setIsBalanceInsufficient(true);
          return;
        }
        setIsBalanceInsufficient(false);
      }
    }
  };

  useEffect((): void => {
    if (id_tg != null) void dispatch(getLevels({ id_tg }));
  }, [id_tg]);

  return (
    <Page className="flex flex-col items-center gap-y-6">
      <h1 className="text-title leading-none text-center">{t("upgrade.title")}</h1>
      <UpgradeControl
        handleUpgradeLevel={() => void handleUpgradeLevel()}
        isBalanceInsufficient={isBalanceInsufficient}
      />

      <section className="w-full">
        <HeaderUpgradeTier />

        {levels?.map(({ level, price, percent }: Level, index: number) => (
          <UpgradeTier key={level} level={level} price={price} percent={percent} index={index} />
        ))}
      </section>
    </Page>
  );
};
