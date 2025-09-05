import { Input, FormField, FormControl, FormItem, FormLabel, FormMessage, Form } from "@/shared/ui";
import { ChevronsDownUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { DepositFormValues, depositSchema } from "@/features/deposit-form/model/depositSchema.ts";
import { ChangeEvent, FormEvent } from "react";
import { TransactionFooter } from "@/widgets";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDepositTransaction } from "@/shared/hooks";

export const DepositForm = () => {
  const { t } = useTranslation();
  const executeDeposit = useDepositTransaction();

  const form = useForm<DepositFormValues>({
    defaultValues: {
      depositAmount: "",
    },
    resolver: zodResolver(depositSchema),
  });

  const error = form.formState.errors.depositAmount;

  const handleDepositTransaction = (data: DepositFormValues) => {
    void executeDeposit(data, form);
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
                  <p className="text-subtitle">TON</p>
                </div>
              </div>

              <FormMessage>{error?.message || ""}</FormMessage>
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
