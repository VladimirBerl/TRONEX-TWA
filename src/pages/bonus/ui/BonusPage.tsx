import { Page } from "@/shared/ui";
import { Bot } from "lucide-react";
import { BenefitCard } from "@/features";
import TelegramIcon from '@mui/icons-material/Telegram';
import { useTranslation } from "react-i18next";

export const BonusPage = () => {
  const { t } = useTranslation()

  return (
    <Page className="flex flex-col items-center gap-y-6">
      <h1 className="text-title leading-none text-center mb-[20px]">{ t("bonus.title") }</h1>

      <section className="w-full">
        <h2 className="text-heading mb-2">{ t("bonus.opportunities") }</h2>

        <BenefitCard
          description={ t("bonus.subscribe_bot") }
          benefit="+ 0.15 TON"
          icon={ <Bot className="w-full h-full stroke-[#151c26]"/> }
        />

        <BenefitCard
          description={ t("bonus.subscribe_channel") }
          benefit="+ 0.20 TON"
          icon={ <TelegramIcon className="!text-[48px] text-[#151c26]"/> }
        />
      </section>
    </Page>
  );
};
