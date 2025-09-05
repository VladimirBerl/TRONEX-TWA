import { Form } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import {
  WithdrawFormValues,
  withdrawSchema,
  WithdrawAmountField,
  WalletAddressField,
  NetworkInfo,
} from "@/features";
import { useForm } from "react-hook-form";
import { FormEvent } from "react";
import { TransactionFooter } from "@/widgets";
import { useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWithdrawTransaction } from "@/shared/hooks";

export const WithdrawForm = () => {
  const { t } = useTranslation();
  const { wallet_address } = useAppSelector((state: RootState) => state.user);
  const executeWithdraw = useWithdrawTransaction();

  const form = useForm<WithdrawFormValues>({
    defaultValues: {
      withdrawAmount: "",
      walletAddress: wallet_address || "",
    },
    resolver: zodResolver(withdrawSchema),
  });

  const handleWithdrawTransaction = (data: WithdrawFormValues) => {
    void executeWithdraw(data, form);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col h-full"
        onSubmit={(event: FormEvent<HTMLFormElement>): void => {
          event.preventDefault();
          void form.handleSubmit(handleWithdrawTransaction)(event);
        }}
      >
        <WithdrawAmountField form={form} />

        <WalletAddressField form={form} />

        <NetworkInfo />

        <p className="text-body-strong pt-2">{t("withdraw.note")}</p>

        <div className="flex items-end h-full w-full pb-2 pt-2">
          <TransactionFooter
            btnText={t("withdraw.btn_text")}
            type="withdraw"
            buttonValue={form.watch("withdrawAmount") || "0"}
          />
        </div>
      </form>
    </Form>
  );
};
