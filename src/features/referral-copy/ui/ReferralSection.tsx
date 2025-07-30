import { Button, Input } from "@/shared/ui";

export const ReferralSection = () => {
  return (
    <section className="flex flex-col items-center w-full gap-2.5">
      <h2 className="text-heading leading-none">Referral link</h2>

      <Input
        className="min-w-[120px] w-full bg-[#1b1b27] border border-[#2a2f40]
        placeholder:text-[#5d8cf0] placeholder:text-center
        focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20
        transition-all duration-200"
        placeholder="https://t.me/bot_name/app?start=userId"
      />

      <Button className="text-button-strong min-w-[120px] w-full">Copy Link</Button>
    </section>
  );
};
