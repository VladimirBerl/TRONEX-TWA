import { Page } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const BannedPage = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <div className="flex items-center justify-center h-screen bg-[#111217]">
        <section className="flex flex-col items-center gap-4 max-w-md text-center">
          <div className="text-[80px] animate-pulse leading-none">🚫</div>

          <h1 className="text-title-negative">{t("banned.title")}</h1>

          <h2 className="text-white-heading">{t("banned.subtitle")}</h2>

          <p className="text-banned-description">{t("banned.description")}</p>

          <p className="text-white-strong-16">
            {t("banned.contact")}{" "}
            <a href="mailto:support@example.com" className="text-link">
              support@example.com
            </a>
          </p>
        </section>
      </div>
    </Page>
  );
};
