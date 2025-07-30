import { StatisticItem } from "@/entities";
import { useTranslation } from "react-i18next";

export const ReferralStatistics = () => {
  const { t } = useTranslation()

  return (
    <article className="w-full">
      <h2 className="text-heading text-center mb-2">{ t("invite.referral_statistics") }</h2>

      <dl className="space-y-4">
        <StatisticItem label={ t("invite.all_time_referrals") } value="12"/>
        <StatisticItem label={ t("invite.referred_deposits") } value="8 (154.25 TON)"/>
        <StatisticItem label={ t("invite.your_ton_deposited") } value="72.00"/>
      </dl>
    </article>

  );
};
