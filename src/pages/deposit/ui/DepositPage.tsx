import { Page } from "@/shared/ui";
import { TransactionFooter } from "@/widgets";
import { DepositForm } from "@/features";
import { useTranslation } from "react-i18next";

export const DepositPage = () => {
  const { t } = useTranslation()

  return (
    <Page className="flex flex-col items-center gap-y-6">
      <h1 className="text-title leading-none text-center">{ t("deposit.title") }</h1>
      <DepositForm/>
      <TransactionFooter btnText={ t("deposit.btn_text") }/>
    </Page>
  );
};