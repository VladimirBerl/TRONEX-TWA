import { Button, Page, Input } from "@/shared/ui";

export const InvitePage = () => {
  return (
    <Page className="flex flex-col items-center gap-y-6 w-full">
      <h1 className="uppercase text-[#5d8cf0] text-5xl font-bold mb-5">Invite</h1>

      <section className="flex flex-col items-center w-full gap-2.5">
        <h2 className="uppercase text-[#535A64] text-[18px] leading-none">Referral link</h2>
        <Input
          className="min-w-[120px] w-full bg-[#1b1b27] border border-[#2a2f40] placeholder:text-[#5d8cf0] placeholder:text-center
             focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20
             transition-all duration-200"
          placeholder="https://t.me/bot_name/app?start=userId"
        />
        <Button className="uppercase min-w-[120px] w-full font-semibold">Copy Link</Button>
      </section>

      <article className="w-full">
        <h2 className="text-center text-[#535A64] uppercase mb-2 text-[18px]">Referral statistics</h2>

        <dl className="space-y-4">
          <div className="flex justify-between">
            <dt>All-time referrals</dt>
            <dd className="text-[#18A7FB]">12</dd>
          </div>

          <div className="flex justify-between">
            <dt>Referred deposits</dt>
            <dd className="text-[#18A7FB]">8 (154.25 TON)</dd>
          </div>

          <div className="flex justify-between">
            <dt>Your TON deposited</dt>
            <dd className="text-[#18A7FB]">72.00</dd>
          </div>
        </dl>
      </article>
    </Page>
  );
};