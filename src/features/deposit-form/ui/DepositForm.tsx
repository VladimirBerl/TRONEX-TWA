import { Input } from "@/shared/ui";
import { ChevronsDownUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export const DepositForm = () => {
  const { t } = useTranslation();

  return (
    <form className="mb-6 w-full">
      <h2 className="text-white-heading mb-2">{t("deposit.your_deposit")}</h2>

      <div className="relative">
        <Input
          className="bg-[#1b1b27] pr-[95px] pl-[16px] h-[50px]
            border border-[#2c2c3b] rounded-lg
            focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20
            transition-all duration-200
            placeholder:text-[24px] text-[24px] leading-[50px]"
          placeholder="0"
        />

        <div className="absolute top-[8px] right-[10px] flex items-center gap-0.5">
          <ChevronsDownUp className="stroke-[#18A7FB] w-[14px] h-[14px]" />
          <p className="text-subtitle">USDT</p>
        </div>
      </div>

      <p className="text-body pt-1">{t("deposit.fee_notice")}</p>
    </form>
  );
};
