import { Page } from "@/shared/ui";
import { MobileNavBar, DepositHistoryList } from "@/widgets";
import { useTranslation } from "react-i18next";

export const DepositHistoryPage = () => {
  const { t } = useTranslation();

  return (
    <Page className="grid grid-rows-[auto_1fr] gap-y-6 h-screen relative">
      <h1 className="text-title text-center leading-none">{t("depositHistory.title")}</h1>

      <section className="w-full">
        <h2 className="text-heading mb-2">{t("depositHistory.title")}</h2>
        <DepositHistoryList />
      </section>

      <div className="sticky bottom-0 w-full">
        <MobileNavBar page="/deposit" />
      </div>
    </Page>
  );
};
