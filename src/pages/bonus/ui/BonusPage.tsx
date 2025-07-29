import { Page } from "@/shared/ui";
import { Bot } from "lucide-react";
import { BenefitCard } from "@/features";
import TelegramIcon from '@mui/icons-material/Telegram';

export const BonusPage = () => {
  return (
    <Page className="flex flex-col items-center gap-y-6">
      <h1 className="text-5xl text-[#5c8afa] uppercase font-semibold text-center mb-[20px]">Bonus</h1>

      <section className="w-full">
        <h2 className="text-[#535A64] uppercase font-semibold mb-2">Opportunities</h2>

        <BenefitCard description="Subscribe to the bot" benefit="+ 0.15 TON"
                     icon={ <Bot className="w-full h-full stroke-[#151c26]"/> }
        />

        <BenefitCard description="Subscribe to the channel" benefit="+ 0.20 TON"
                     icon={ <TelegramIcon className="!text-[48px] text-[#151c26]"/> }
        />
      </section>
    </Page>
  );
};
