import { useTranslation } from "react-i18next";

export const PassiveIncome = () => {
  const { t } = useTranslation();

  return (
    <section className="my-[26px]">
      <h2 className="text-heading-light text-center">{t("home.passive_income")}</h2>

      <div className="flex gap-2.5 items-center">
        <p className="text-large block leading-none">0.000000</p>
        <p className="text-medium block leading-none">{t("home.ton_per_hour")}</p>
      </div>
    </section>
  );
};
