import { Page } from "@/shared/ui";
import { UpgradeControl, UpgradeTier } from "@/features";
import { HeaderUpgradeTier } from "@/widgets";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import axios from "axios";
import { Level } from "@/shared/api/upgrade/types.ts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { setLevel, setFarmBalance } from "@/features/auth/model/slice/userSlice.ts";
import { setLevels } from "@/features/levels/model/slice/levelsSlice.ts";

export const UpgradePage = () => {
  const { t } = useTranslation();
  // const [levels, setLevels] = useState<Level[] | null>(null);
  const [isBalanceInsufficient, setIsBalanceInsufficient] = useState<boolean>(false);
  const { level, id_tg, investment_balance } = useSelector((state: RootState) => state.user);
  const { levels } = useSelector((state: RootState) => state.levels);
  const dispatch = useDispatch();

  const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

  const handleUpgradeLevel = async (): Promise<void> => {
    const price: number = Math.round(parseFloat(levels?.[0].price ?? "0"));

    if (investment_balance >= price) {
      try {
        const response = await axios.patch<Level[]>(`${API_URL}/api/upgrade-level`, {
          id_tg,
        });
        console.log("Успешный ответ:", response.data);

        if (levels) {
          const updatedLevels: Level[] = levels.filter(
            ({ price }: Level): boolean => price !== levels[0].price,
          );

          dispatch(setLevels(updatedLevels));
        }

        setIsBalanceInsufficient(false);

        dispatch(setLevel(level + 1));
        dispatch(setFarmBalance(investment_balance - price));
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setIsBalanceInsufficient(true);

          console.error("Status code:", error.response?.status);
          console.error("Response:", error.response?.data);
        } else {
          console.error("Unknown error:", error);
        }
      }
    }
  };

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
