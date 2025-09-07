import { Page } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { MobileNavBar, BonusTaskList } from "@/widgets";

export const BonusPage = () => {
  const { t } = useTranslation();

  return (
    <Page className="grid grid-rows-[auto_1fr] gap-y-6 h-screen relative">
      <h1 className="text-title leading-none text-center mb-[20px]">{t("bonus.title")}</h1>

      <section className="w-full">
        <h2 className="text-heading mb-2">{t("bonus.opportunities")}</h2>
        <BonusTaskList />
      </section>

      <div className="sticky bottom-0 w-full">
        <MobileNavBar page="/bonus" />
      </div>
    </Page>
  );
};
