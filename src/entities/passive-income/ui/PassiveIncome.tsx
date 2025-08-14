import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { checkLengthNumbers } from "@/shared/lib/checkLengthNumber.tsx";

export const PassiveIncome = () => {
  const { t } = useTranslation();
  const { levels } = useSelector((state: RootState) => state.levels);
  const { level, investment_balance } = useSelector((state: RootState) => state.user);

  return (
    <section className="my-[26px]">
      <h2 className="text-heading-light text-center">{t("home.passive_income")}</h2>

      <div className="flex gap-2.5 items-center justify-center">
        <span className="text-large block leading-none">
          {checkLengthNumbers(
            levels?.[level]?.percent != null ?
              ((levels[level].percent / 100) * investment_balance * 24).toFixed(6)
            : "N/A",
            14,
            32,
            2,
          )}
        </span>
        <p className="text-medium  leading-none">{t("home.ton_per_hour")}</p>
      </div>
    </section>
  );
};
