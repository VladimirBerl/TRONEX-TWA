import { Page } from "@/shared/ui";
import { ReferralSection } from "@/features/index.ts";
import { ReferralStatistics } from "@/widgets/referral-statistics/index.ts";
import { useTranslation } from "react-i18next";

export const InvitePage = () => {
  const { t } = useTranslation();
  console.log(123);
  return (
    <Page className="grid grid-rows-[auto_auto_auto] gap-y-6">
      <h1 className="text-title leading-none text-center">{t("invite.title")}</h1>
      <ReferralSection />
      <ReferralStatistics />
    </Page>
  );
};
