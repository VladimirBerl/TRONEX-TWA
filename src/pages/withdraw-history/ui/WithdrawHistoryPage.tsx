import { Page } from "@/shared/ui";
import { MobileNavBar, WithdrawHistoryList } from "@/widgets";
import { useTranslation } from "react-i18next";

export const WithdrawHistoryPage = () => {
  const { t } = useTranslation();

  return (
    <Page className="grid grid-rows-[auto_1fr_auto] h-screen gap-y-6">
      <h1 className="text-title leading-none text-center">{t("withdrawHistory.title")}</h1>

      <section className="w-full">
        <h2 className="text-heading mb-2">{t("withdrawHistory.transactions")}</h2>
        <WithdrawHistoryList />
      </section>

      <div className="sticky bottom-0 w-full">
        <MobileNavBar page="/deposit" />
      </div>
    </Page>
  );
};
