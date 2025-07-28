import { Page } from "@/shared/ui";
import { ReferralSection } from "@/features/index.ts";
import { ReferralStatistics } from "@/widgets/referral-statistics/index.ts";

export const InvitePage = () => {
  return (
    <Page className="flex flex-col items-center gap-y-6 w-full">
      <h1 className="uppercase text-[#5d8cf0] text-5xl font-bold mb-5">Invite</h1>
      <ReferralSection/>
      <ReferralStatistics/>
    </Page>
  );
};