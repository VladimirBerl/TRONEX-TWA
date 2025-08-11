import { StatisticItem } from "@/entities";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";

export const ReferralStatistics = () => {
  const { t } = useTranslation();
  const referrals = useAppSelector((state: RootState) => state.user.referrals);
  const { all_referrals, all_referrals_deposit, deposit_amount } = referrals || {};

  return (
    <article className="w-full">
      <h2 className="text-heading text-center mb-2">{t("invite.referral_statistics")}</h2>

      <dl className="space-y-4">
        <StatisticItem label={t("invite.all_time_referrals")} value={all_referrals || "0"} />
        <StatisticItem label={t("invite.referred_deposits")} value={all_referrals_deposit || "0"} />
        <StatisticItem
          label={t("invite.your_ton_deposited")}
          value={Number(deposit_amount).toFixed(6) || "0"}
        />
      </dl>
    </article>
  );
};
