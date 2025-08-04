import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";

export const PassiveIncome = () => {
  const { t } = useTranslation();
  const { levels } = useSelector((state: RootState) => state.levels);
  const { level, investment_balance } = useSelector((state: RootState) => state.user);

  return (
    <section className="my-[26px]">
      <h2 className="text-heading-light text-center">{t("home.passive_income")}</h2>

      <div className="flex gap-2.5 items-center justify-center">
        <p className="text-large block leading-none">
          {levels?.[level]?.percent != null ?
            ((levels[level].percent / 100) * investment_balance * 24).toFixed(6)
          : "N/A"}
        </p>
        <p className="text-medium block leading-none">{t("home.ton_per_hour")}</p>
      </div>
    </section>
  );
};
