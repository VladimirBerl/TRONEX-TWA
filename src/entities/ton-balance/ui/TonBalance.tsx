import { useTranslation } from "react-i18next";

export const TonBalance = () => {
  const { t } = useTranslation()

  return (
    <section>
      <h1 className="text-heading">{ t("home.balance") }</h1>
      <p className="text-center-heading block leading-none">0.000000</p>
    </section>
  );
};
