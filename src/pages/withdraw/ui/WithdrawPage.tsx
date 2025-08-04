import { Page } from "@/shared/ui";
import { WithdrawForm } from "@/features";
import { TransactionFooter } from "@/widgets";
import { useTranslation } from "react-i18next";

export const WithdrawPage = () => {
  const { t } = useTranslation();

  return (
    <Page className="flex flex-col h-[100vh]">
      <h1 className="text-title leading-none text-center mb-[26px]">{t("withdraw.title")}</h1>
      <WithdrawForm />

      <div className="flex items-end h-full w-full pb-8 pt-2">
        <TransactionFooter btnText={t("withdraw.btn_text")} />
      </div>
    </Page>
  );
};
