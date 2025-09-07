import { Page } from "@/shared/ui";
import { FormDisplay, MobileNavBar } from "@/widgets";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { FormSwitcher } from "@/features";

export const DepositPage = () => {
  const { t } = useTranslation();
  const [selectForm, setSelectForm] = useState<string>("deposit");

  return (
    <Page className="grid grid-rows-[auto_auto_1fr] h-screen">
      <h1 className="text-title leading-none text-center mb-[26px]">
        {selectForm === "deposit" ? t("deposit.title") : t("withdraw.title")}
      </h1>

      <FormSwitcher selectForm={selectForm} setSelectForm={setSelectForm} />

      <FormDisplay selectForm={selectForm} />

      <MobileNavBar page="/deposit" />
    </Page>
  );
};
