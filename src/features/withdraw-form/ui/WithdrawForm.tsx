import {
  Input,
  FormField,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
  FormItem,
  Form,
} from "@/shared/ui";
import { ChevronsDownUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { WithdrawFormValues, withdrawSchema } from "@/features";
import { useForm } from "react-hook-form";
import { ChangeEvent, FormEvent } from "react";
import { TransactionFooter } from "@/widgets";
import { useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

export const WithdrawForm = () => {
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
      await axios.post(`${API_URL}/api/withdraw/${id_tg}/create`, {
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

  const {
    formState: { errors },
  } = form;

  return (
    <Form {...form}>
      <form
        className="flex flex-col h-full"
        onSubmit={(event: FormEvent<HTMLFormElement>): void => {
          event.preventDefault();
          void form.handleSubmit(handleWithdrawTransaction)(event);
        }}
      >
        <section className="mb-6">
          <FormField
            name="withdrawAmount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white-heading">{t("withdraw.you_withdraw")}</FormLabel>

                <div className="relative">
                  <FormControl>
                    <Input
                      {...field}
                      className="bg-[#1b1b27] h-[50px] pr-[95px] pl-[16px] py-[12px] text-[24px] border border-[#2c2c3b] rounded-lg focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20 transition-all duration-200 placeholder:text-[24px] font-semibold [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      placeholder="0"
                      onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                        const value: string = e.target.value;
                        if (value.length <= 12) {
                          field.onChange(value);
                        }
                      }}
                      type="number"
                    />
                  </FormControl>

                  <div className="absolute top-[8px] right-[10px] flex items-center gap-0.5">
                    <ChevronsDownUp className="stroke-[#18A7FB] w-[14px] h-[14px]" />
                    <p className="text-subtitle">TON</p>
                  </div>
                </div>

                <FormMessage>{errors?.withdrawAmount?.message}</FormMessage>

                <FormDescription className="text-body">{t("withdraw.fee")}</FormDescription>
              </FormItem>
            )}
          ></FormField>
        </section>

        <section className="mb-6">
          <FormField
            name="walletAddress"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white-heading">{t("withdraw.wallet_address")}</FormLabel>

                <FormControl>
                  <Input
                    className="bg-[#1b1b27] pr-[80px] border border-[#2c2c3b] rounded-lg focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20 transition-all duration-200"
                    placeholder="0QCARUdldrIjELKSQRI1zkaAJtQgi7tD8A9fK-GwT7vASPkt"
                    {...field}
                  />
                </FormControl>

                <FormMessage>{errors.walletAddress?.message}</FormMessage>
              </FormItem>
            )}
          ></FormField>
        </section>

        <section>
          <h2 className="text-white-heading mb-2 leading-none">{t("withdraw.network")}</h2>
          <Input
            className="bg-[#1b1b27] pr-[80px] border border-[#2c2c3b] rounded-lg focus:outline-none pointer-events-none select-none"
            value="TON"
            readOnly
          />
        </section>

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
