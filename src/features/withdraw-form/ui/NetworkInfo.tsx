import { Input } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const NetworkInfo = () => {
  const { t } = useTranslation();

  return (
    <section>
      <h2 className="text-white-heading mb-2 leading-none">{t("withdraw.network")}</h2>
      <Input
        value="TON"
        readOnly
        className="bg-[#1b1b27] pr-[80px] border border-[#2c2c3b] rounded-lg focus:outline-none pointer-events-none select-none"
      />
    </section>
  );
};
