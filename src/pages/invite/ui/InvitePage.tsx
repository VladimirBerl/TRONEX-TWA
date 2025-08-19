import { Page } from "@/shared/ui";
import { ReferralSection } from "@/features/index.ts";
import { ReferralStatistics } from "@/widgets/referral-statistics/index.ts";
import { useTranslation } from "react-i18next";
import { MobileNavBar } from "@/widgets";

export const InvitePage = () => {
  const { t } = useTranslation();

  return (
    <Page className="grid grid-rows-[auto_auto_1fr] gap-y-6 h-screen">
      <h1 className="text-title leading-none text-center">{t("invite.title")}</h1>
      <ReferralSection />
      <ReferralStatistics />
      <MobileNavBar page="/invite" />
    </Page>
  );
};
