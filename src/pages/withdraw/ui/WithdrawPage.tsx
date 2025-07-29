import { Page } from "@/shared/ui";
import { WithdrawForm } from "@/features";
import { TransactionFooter } from "@/widgets";

export const WithdrawPage = () => {
  return (
    <Page className="flex flex-col items-center gap-y-6">
      <h1 className="text-5xl text-[#5c8afa] uppercase font-semibold text-center">Withdraw</h1>
      <WithdrawForm/>
      <TransactionFooter btnText="Withdraw 0 USDT"/>
    </Page>
  );
};


