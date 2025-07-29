import { Page } from "@/shared/ui";
import { TransactionFooter } from "@/widgets";
import { DepositForm } from "@/features";

export const DepositPage = () => {
  return (
    <Page className="flex flex-col items-center gap-y-6">
      <h1 className="text-5xl text-[#5c8afa] uppercase font-semibold text-center">Deposit</h1>
      <DepositForm/>
      <TransactionFooter btnText="Deposit 0 USDT"/>
    </Page>
  );
};