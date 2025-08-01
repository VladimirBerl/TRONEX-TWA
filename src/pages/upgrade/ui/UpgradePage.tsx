import { Page } from '@/shared/ui';
import { UpgradeControl, UpgradeTier } from "@/features";
import { HeaderUpgradeTier } from "@/widgets";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import { Level } from "@/shared/api/upgrade/types.ts"

export const UpgradePage = () => {
  const { t } = useTranslation()
  const [ levels, setLevels ] = useState<Level[] | null>(null);

  const API_URL: string = import.meta.env.VITE_API_BASE_URL;

  const handleGetLevels = async (): Promise<void> => {
    try {
      const response = await axios.get(`${ API_URL }/api/levels`);
      setLevels(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect((): void => {
    void handleGetLevels();
  }, []);

  return (
    <Page className="flex flex-col items-center gap-y-6">
      <h1 className="text-title leading-none text-center">{ t("upgrade.title") }</h1>
      <UpgradeControl/>

      <section className="w-full">
        <HeaderUpgradeTier/>

        { levels?.map(({ level, price, percent }) => (
          <UpgradeTier
            key={ level }
            level={ level }
            price={ price }
            percent={ percent }
          />
        )) }
      </section>
    </Page>
  );
};
