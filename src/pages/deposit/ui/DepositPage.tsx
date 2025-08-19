import { Page, Button } from "@/shared/ui";
import { MobileNavBar } from "@/widgets";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { DepositForm, WithdrawForm } from "@/features";

export const DepositPage = () => {
  const { t } = useTranslation();
  const [selectForm, setSelectForm] = useState<string>("deposit");

  return (
    <Page className="grid grid-rows-[auto_auto_1fr] h-screen">
      <h1 className="text-title leading-none text-center mb-[26px]">
        {selectForm === "deposit" ? `${t("deposit.title")}` : `${t("withdraw.title")}`}
      </h1>

      <section className="flex w-full justify-around bg-[#1b1d29] p-1 mb-[26px] rounded-[12px]">
        <Button
          onClick={(): void => setSelectForm("deposit")}
          className={`${selectForm === "deposit" ? "bg-[#18a7fb] hover:bg-[#18a7fb]" : "bg-transparent"} rounder-[6px] min-w-[140px] text-balance`}
        >
          Депозит
        </Button>

        <Button
          onClick={(): void => setSelectForm("withdraw")}
          className={`${selectForm === "withdraw" ? "bg-[#18a7fb] hover:bg-[#18a7fb]" : "bg-transparent"} rounder-[6px] min-w-[140px] text-balance`}
        >
          Вывод
        </Button>
      </section>

      {selectForm === "deposit" ?
        <DepositForm />
      : <WithdrawForm />}

      <MobileNavBar page="/deposit" />
    </Page>
  );
};
