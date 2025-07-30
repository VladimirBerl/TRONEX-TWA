import { StatisticItem } from "@/entities";

export const ReferralStatistics = () => {
  return (
    <article className="w-full">
      <h2 className="text-heading text-center mb-2">Referral statistics</h2>

      <dl className="space-y-4">
        <StatisticItem label="All-time referrals" value="12" />
        <StatisticItem label="Referred deposits" value="8 (154.25 TON)" />
        <StatisticItem label="Your TON deposited" value="72.00" />
      </dl>
    </article>
  );
};
