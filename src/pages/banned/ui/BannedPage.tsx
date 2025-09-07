import { Page, Button } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const BannedPage = () => {
  const { t } = useTranslation();

  return (
    <Page className="flex flex-col min-h-screen bg-[#111217] relative">
      <section className="flex-1 flex flex-col items-center justify-center gap-4">
        <div className="text-[80px] animate-pulse leading-none">🚫</div>
        <p className="text-white-md text-center">{t("banned.message")}</p>
      </section>

      <Button variant="banned" className="mb-3">
        {t("banned.support")}
      </Button>
    </Page>
  );
};
