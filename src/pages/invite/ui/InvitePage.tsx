import { Page } from "@/shared/ui";
import { ReferralSection } from "@/features/index.ts";
import { ReferralStatistics } from "@/widgets/referral-statistics/index.ts";
import { useTranslation } from "react-i18next";

export const InvitePage = () => {
  const { t } = useTranslation()

  return (
    <Page className="flex flex-col items-center gap-y-6 w-full">
      <h1 className="text-title leading-none mb-5">{t("invite.title")}</h1>
      <ReferralSection />
      <ReferralStatistics />
    </Page>
  );
};