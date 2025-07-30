import { Page } from "@/shared/ui";
import { WithdrawForm } from "@/features";
import { TransactionFooter } from "@/widgets";
import { useTranslation } from "react-i18next";

export const WithdrawPage = () => {
  const { t } = useTranslation()

  return (
    <Page className="flex flex-col items-center gap-y-6">
      <h1 className="text-title leading-none text-center">{ t("withdraw.title") }</h1>
      <WithdrawForm/>
      <TransactionFooter btnText={ t("withdraw.btn_text") }/>
    </Page>
  );
};


