import { Page } from '@/shared/ui';
import { UpgradeControl, UpgradeTier } from "@/features";
import { HeaderUpgradeTier } from "@/widgets";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { Level } from "@/shared/api/upgrade/types.ts";
import { LevelContext } from "@/app/provider/level-provider/LevelProvider.tsx";
import { useRequiredContext } from "@/shared/hooks/useRequiredContext.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";

export const UpgradePage = () => {
  const { t } = useTranslation()
  const [ levels, setLevels ] = useState<Level[] | null>(null);
  const { setLevel } = useRequiredContext(LevelContext, "LevelContext");

  const API_URL: string = import.meta.env.VITE_API_BASE_URL;
  const id_tg: string | null = useSelector((state: RootState): string | null => state.user.id_tg);

  const balance = 20; // Заглушка

  const handleGetLevels = async (): Promise<void> => {
    try {
      const response = await axios.get(`${ API_URL }/api/levels`);
      setLevels(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpgradeLevel = async (): Promise<void> => {
    if (balance >= Math.round(parseFloat(levels?.[0].price ?? "0"))) {
      setLevels((prev: Level[] | null): Level[] => prev ? prev.filter(({ price }: Level): boolean => price !== levels?.[0].price) : []);
      setLevel((prev: number): number => ++prev);

      try {
        const response = await axios.post(`${ API_URL }/api/upgrade-level`, {
          id_tg,
        });
        console.log(response);

      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response?.data?.detail === "string") {
            console.error(error.response.data);
          }
        } else {
          console.error("Unknown error", error);
        }
      }
    }
  };

  useEffect((): void => {
    void handleGetLevels();
  }, []);

  return (
    <Page className="flex flex-col items-center gap-y-6">
      <h1 className="text-title leading-none text-center">{ t("upgrade.title") }</h1>
      <UpgradeControl
        handleUpgradeLevel={ handleUpgradeLevel }
        balance={ balance }
        requiredAmount={ Math.round(parseFloat(levels?.[0].price ?? "0")) }
      />

      <section className="w-full">
        <HeaderUpgradeTier/>

        { levels?.map(({ level, price, percent }: Level, index: number) => (
          <UpgradeTier
            key={ level }
            level={ level }
            price={ price }
            percent={ percent }
            index={ index }
          />
        )) }
      </section>
    </Page>
  );
};
