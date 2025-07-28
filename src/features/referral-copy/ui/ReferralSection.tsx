import { Button, Input } from "@/shared/ui";

export const ReferralSection = () => {
  return (
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
  );
};
