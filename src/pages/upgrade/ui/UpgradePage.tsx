import { Page } from "@/shared/ui";
import { MobileNavBar } from "@/widgets";
import { useTranslation } from "react-i18next";
import { UpgradeContent } from "@/widgets";

export const UpgradePage = () => {
  const { t } = useTranslation();

  return (
    <Page className="flex flex-col h-screen relative">
      <h1 className="text-title leading-none text-center mb-[24px]">{t("upgrade.title")}</h1>

      <UpgradeContent />

      <div className="sticky bottom-0 w-full">
        <MobileNavBar page="/" />
      </div>
    </Page>
  );
};
