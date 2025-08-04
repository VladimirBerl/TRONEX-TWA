import { Page } from "@/shared/ui";
import { TransactionFooter } from "@/widgets";
import { DepositForm } from "@/features";
import { useTranslation } from "react-i18next";

export const DepositPage = () => {
  const { t } = useTranslation();

  return (
    <Page className="flex flex-col h-[100vh]">
      <h1 className="text-title leading-none text-center mb-[26px]">{t("deposit.title")}</h1>
      <DepositForm />

      <div className="flex items-end h-full w-full pb-8 pt-2">
        <TransactionFooter btnText={t("deposit.btn_text")} />
      </div>
    </Page>
  );
};
