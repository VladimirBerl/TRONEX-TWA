import { Page } from "@/shared/ui";
import { WithdrawForm } from "@/features";
import { TransactionFooter } from "@/widgets";

export const WithdrawPage = () => {
  return (
    <Page className="flex flex-col items-center gap-y-6">
      <h1 className="text-title leading-none text-center">Withdraw</h1>
      <WithdrawForm/>
      <TransactionFooter btnText="Withdraw 0 USDT"/>
    </Page>
  );
};


