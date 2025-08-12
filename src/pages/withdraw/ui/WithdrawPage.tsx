import { Page, Form } from "@/shared/ui";
import { WithdrawForm, withdrawSchema, WithdrawFormValues } from "@/features";
import { TransactionFooter } from "@/widgets";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent } from "react";
import axios from "axios";
import { useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";

export const WithdrawPage = () => {
  const { t } = useTranslation();
  const { id_tg } = useAppSelector((state: RootState) => state.user);
  const { wallet_address, investment_balance } = useAppSelector((state: RootState) => state.user);

  const form = useForm<WithdrawFormValues>({
    defaultValues: {
      withdrawAmount: "",
      walletAddress: wallet_address || "",
    },
    resolver: zodResolver(withdrawSchema),
  });

  const handleWithdrawTransaction = async (data: WithdrawFormValues): Promise<void> => {
    const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;
    const { withdrawAmount, walletAddress } = data;

    if (Number(withdrawAmount) > investment_balance) {
      form.setError("withdrawAmount", {
        type: "manual",
        message: "Недостаточно средств на балансе",
      });
      return;
    }

    try {
      await axios.post(`${API_URL}/api/withdraw/create`, {
        id_tg: id_tg,
        network: "TON",
        wallet_address: walletAddress,
        amount: withdrawAmount,
      });

      alert(`Выведено: ${withdrawAmount}`);
      form.reset({ withdrawAmount: "" });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page className="grid grid-rows-[auto_1fr] h-screen">
      <h1 className="text-title leading-none text-center mb-[26px]">{t("withdraw.title")}</h1>

      <Form {...form}>
        <form
          className="flex flex-col h-full"
          onSubmit={(event: FormEvent<HTMLFormElement>): void => {
            event.preventDefault();
            void form.handleSubmit(handleWithdrawTransaction)(event);
          }}
        >
          <WithdrawForm form={form} />

          <div className="flex items-end h-full w-full pb-4 pt-2">
            <TransactionFooter
              btnText={t("withdraw.btn_text")}
              buttonValue={form.watch("withdrawAmount") || "0"}
            />
          </div>
        </form>
      </Form>
    </Page>
  );
};
