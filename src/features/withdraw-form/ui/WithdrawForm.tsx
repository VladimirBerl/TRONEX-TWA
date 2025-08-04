import { Input } from "@/shared/ui";
import { ChevronsDownUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export const WithdrawForm = () => {
  const { t } = useTranslation();

  // TODO Пока ваниальная форма и без декомпозиции, нужно уточнить по валидации
  return (
    <form className="w-full">
      <section className="mb-6">
        <h2 className="text-white-heading mb-2">{t("withdraw.you_withdraw")}</h2>

        <div className="relative">
          <Input
            className="bg-[#1b1b27] h-[50px] pr-[95px] pl-[16px] py-[12px] text-[24px]
            border border-[#2c2c3b] rounded-lg
            focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20
            transition-all duration-200
            placeholder:text-[24px] font-semibold"
            placeholder="0"
          />

          <div className="absolute top-[8px] right-[10px] flex items-center gap-0.5">
            <ChevronsDownUp className="stroke-[#18A7FB] w-[14px] h-[14px]" />
            <p className="text-subtitle">USDT</p>
          </div>
        </div>
        <p className="text-body pt-1">{t("withdraw.fee")}</p>
      </section>

      <section className="mb-6">
        <h2 className="font-semibold mb-1">{t("withdraw.wallet_address")}</h2>
        <Input
          className="bg-[#1b1b27] pr-[80px] border border-[#2c2c3b] rounded-lg
        focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20
        transition-all duration-200"
          placeholder="0xc304sjfujewhiuh3ih2"
        />
      </section>

      <section>
        <h2 className="font-semibold mb-1">{t("withdraw.network")}</h2>
        <Input
          className="bg-[#1b1b27] pr-[80px] border border-[#2c2c3b] rounded-lg
          focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20
          transition-all duration-200
          placeholder:font-semibold placeholder:text-[14px]"
          placeholder="BSC (BEP-20)"
        />
      </section>

      <p className="text-body-strong pt-3">{t("withdraw.note")}</p>
    </form>
  );
};
