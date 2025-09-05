import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
  FormDescription,
} from "@/shared/ui";
import { ChevronsDownUp } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { WithdrawFormValues } from "@/features";
import { useTranslation } from "react-i18next";

interface WithdrawAmountFieldProps {
  form: UseFormReturn<WithdrawFormValues>;
}

export const WithdrawAmountField = ({ form }: WithdrawAmountFieldProps) => {
  const { t } = useTranslation();
  const error = form.formState.errors.withdrawAmount;

  return (
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
                  type="number"
                  placeholder="0"
                  className="bg-[#1b1b27] h-[50px] pl-[16px] py-[12px] text-[24px] border border-[#2c2c3b] rounded-lg focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20 transition-all duration-200 placeholder:text-[24px] font-semibold [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  onChange={(e) => {
                    if (e.target.value.length <= 12) field.onChange(e.target.value);
                  }}
                />
              </FormControl>

              <div className="absolute top-[8px] right-[10px] flex items-center gap-0.5">
                <ChevronsDownUp className="stroke-[#18A7FB] w-[14px] h-[14px]" />
                <p className="text-subtitle">TON</p>
              </div>
            </div>

            <FormMessage>{error?.message}</FormMessage>
            <FormDescription className="text-body">{t("withdraw.fee")}</FormDescription>
          </FormItem>
        )}
      />
    </section>
  );
};
