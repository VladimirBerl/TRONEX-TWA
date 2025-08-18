import { Input, FormField, FormControl, FormItem, FormLabel, FormMessage, Form } from "@/shared/ui";
import { ChevronsDownUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { DepositFormValues, depositSchema } from "@/features/deposit-form/model/depositSchema.ts";
import { ChangeEvent, FormEvent } from "react";
import { TransactionFooter } from "@/widgets";
import { deposit } from "@/features";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { Cell } from "@ton/core";

export const DepositForm = () => {
  const { t } = useTranslation();
  const [tonConnectUI] = useTonConnectUI();
  const address: string = useTonAddress();
  const { id_tg, wallet_address } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<DepositFormValues>({
    defaultValues: {
      depositAmount: "",
    },
    resolver: zodResolver(depositSchema),
  });

  const error = form.formState.errors.depositAmount;

  const handleDepositTransaction = async (data: DepositFormValues): Promise<void> => {
    if (!address) {
      alert("Connect wallet first");
      return;
    }

    if (!wallet_address) {
      alert("Deposit address is missing");
      return;
    }

    const amountTON = parseFloat(data.depositAmount);
    if (isNaN(amountTON) || amountTON <= 0) {
      alert("Invalid deposit amount");
      return;
    }

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 600,
      messages: [
        {
          address: wallet_address,
          amount: (amountTON * 1_000_000_000).toString(),
        },
      ],
    };

    try {
      const result = await tonConnectUI.sendTransaction(transaction);

      const bocCell = Cell.fromBoc(Buffer.from(result.boc, "base64"))[0];
      const hash = bocCell.hash().toString("hex");

      const amount: string = data.depositAmount.toString();

      if (id_tg != null) {
        void dispatch(deposit({ id_tg, amount, wallet_address, hash }));
      }
      form.reset({ depositAmount: "" });
      void navigate("/deposit", { replace: true });

      alert("Transaction sent! Please confirm in your wallet");
    } catch (e) {
      console.error(e);
      alert("Failed to send transaction");
      return;
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col h-full"
        onSubmit={(event: FormEvent<HTMLFormElement>): void => {
          event.preventDefault();
          void form.handleSubmit(handleDepositTransaction)(event);
        }}
      >
        <FormField
          name="depositAmount"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mb-6 w-full">
              <FormLabel className="text-white-heading">{t("deposit.your_deposit")}</FormLabel>

              <div className="relative">
                <FormControl>
                  <Input
                    {...field}
                    className="bg-[#1b1b27] appearance-none pr-[95px] pl-[16px] h-[50px] border border-[#2c2c3b] rounded-lgfocus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20transition-all duration-200 placeholder:text-[24px] text-[24px] leading-[50px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    placeholder="0"
                    type="number"
                    onChange={(e: ChangeEvent<HTMLInputElement>): void => {
                      const value: string = e.target.value;
                      if (value.length <= 12) {
                        field.onChange(value);
                      }
                    }}
                  />
                </FormControl>

                <div className="absolute top-[8px] right-[10px] flex items-center gap-0.5">
                  <ChevronsDownUp className="stroke-[#18A7FB] w-[14px] h-[14px]" />
                  <p className="text-subtitle">USDT</p>
                </div>
              </div>

              <FormMessage>{error?.message}</FormMessage>
            </FormItem>
          )}
        ></FormField>

        <div className="flex items-end h-full w-full pb-2">
          <TransactionFooter
            btnText={t("deposit.btn_text")}
            type="deposit"
            buttonValue={form.watch("depositAmount") || "0"}
          />
        </div>
      </form>
    </Form>
  );
};
