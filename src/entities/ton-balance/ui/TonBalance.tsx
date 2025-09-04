import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { checkLengthNumbers } from "@/shared/lib/checkLengthNumber.tsx";
import { useTranslation } from "react-i18next";

export const TonBalance = () => {
  const { t } = useTranslation();
  const { farm_balance, investment_balance } = useSelector((state: RootState) => state.user);

  return (
    <section className="flex gap-3 justify-center items-center mb-6">
      <div className="flex gap-3 justify-between bg-[#161720] p-2 min-w-[250px] border-solid border-[#18a7fb] border-[1px] rounded-[8px]">
        <div className="max-w-[110px] leading-none text-center">
          <h2 className="text-heading-balance text-center mb-1">{t("home.investment")}</h2>

          <span className="text-balance leading-none">
            {checkLengthNumbers(parseFloat(investment_balance).toFixed(6), 12, 24, 2)}
          </span>
        </div>

        <div className="max-w-[110px] leading-none text-center">
          <h2 className="text-heading-balance text-center mb-1">{t("home.farm")}</h2>

          <span className="text-balance leading-none">
            {checkLengthNumbers(parseFloat(farm_balance).toFixed(6), 12, 24, 2)}
          </span>
        </div>
      </div>
    </section>
  );
};
