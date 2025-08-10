import { Input, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/shared/ui";
import { ChevronsDownUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { UseFormReturn } from "react-hook-form";
import { DepositFormValues } from "@/features/deposit-form/model/depositSchema.ts";
import { ChangeEvent } from "react";

interface DepositFormProps {
  form: UseFormReturn<DepositFormValues>;
}

export const DepositForm = ({ form }: DepositFormProps) => {
  const { t } = useTranslation();

  const error = form.formState.errors.depositAmount;

  return (
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
  );
};
