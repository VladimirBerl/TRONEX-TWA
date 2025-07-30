import { Page } from "@/shared/ui";
import { TransactionFooter } from "@/widgets";
import { DepositForm } from "@/features";

export const DepositPage = () => {
  return (
    <Page className="flex flex-col items-center gap-y-6">
      <h1 className="text-title leading-none text-center">Deposit</h1>
      <DepositForm/>
      <TransactionFooter btnText="Deposit 0 USDT"/>
    </Page>
  );
};