import { useTranslation } from "react-i18next";

interface TonBalanceProps {
  balance: number | string;
}

export const TonBalance = ({ balance }: TonBalanceProps) => {
  const { t } = useTranslation()

  return (
    <section>
      <h1 className="text-heading">{ t("home.balance") }</h1>
      <p className="text-center-heading block leading-none">{ balance }</p>
    </section>
  );
};
