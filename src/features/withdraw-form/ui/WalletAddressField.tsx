import { UseFormReturn } from "react-hook-form";
import { WithdrawFormValues } from "@/features";
import { FormField, FormItem, FormLabel, FormControl, Input, FormMessage } from "@/shared/ui";
import { useTranslation } from "react-i18next";

interface WalletAddressFieldProps {
  form: UseFormReturn<WithdrawFormValues>;
}

export const WalletAddressField = ({ form }: WalletAddressFieldProps) => {
  const { t } = useTranslation();
  const error = form.formState.errors.withdrawAmount;

  return (
    <section className="mb-6">
      <FormField
        name="walletAddress"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white-heading">{t("withdraw.wallet_address")}</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="0QCARUdldrIjELKSQRI1zkaAJtQgi7tD8A9fK-GwT7vASPkt"
                className="bg-[#1b1b27] border border-[#2c2c3b] rounded-lg focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20 transition-all duration-200"
              />
            </FormControl>
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        )}
      />
    </section>
  );
};
