import {
  Input,
  FormField,
  FormControl,
  FormDescription,
  FormLabel,
  FormMessage,
  FormItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectLabel,
  SelectContent,
  SelectGroup,
} from "@/shared/ui";
import { ChevronsDownUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { WithdrawFormValues } from "@/features";
import { UseFormReturn, Controller } from "react-hook-form";
import { ChangeEvent } from "react";

interface WithdrawFormProps {
  form: UseFormReturn<WithdrawFormValues>;
}

export const WithdrawForm = ({ form }: WithdrawFormProps) => {
  const { t } = useTranslation();

  const {
    formState: { errors },
  } = form;

  return (
    <>
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
                    className="bg-[#1b1b27] h-[50px] pr-[95px] pl-[16px] py-[12px] text-[24px] border border-[#2c2c3b] rounded-lg focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20 transition-all duration-200 placeholder:text-[24px] font-semibold"
                    placeholder="0"
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
              <FormLabel className="font-semibold">{t("withdraw.wallet_address")}</FormLabel>

              <FormControl>
                <Input
                  className="bg-[#1b1b27] pr-[80px] border border-[#2c2c3b] rounded-lg focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20 transition-all duration-200"
                  placeholder="0xc304sjfujewhiuh3ih2"
                  {...field}
                />
              </FormControl>

              <FormMessage>{errors.walletAddress?.message}</FormMessage>
            </FormItem>
          )}
        ></FormField>
      </section>

      <Controller
        name="network"
        control={form.control}
        render={({ field }) => (
          <FormItem>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormLabel className="font-semibold mb-1">{t("withdraw.network")}</FormLabel>

              <SelectTrigger className="w-full cursor-pointer bg-[#1b1b27] border border-[#2c2c3b] rounded-lg focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20 transition-all duration-200 placeholder:font-semibold placeholder:text-[14px]">
                <SelectValue placeholder="Выберите сеть" />
              </SelectTrigger>

              <SelectContent className="bg-[#1b1b27] text-label border border-[#2c2c3b]">
                <SelectGroup>
                  <SelectLabel>Сети</SelectLabel>
                  <SelectItem value="bsc">BSC (BEP-20)</SelectItem>
                  <SelectItem value="ethereum">Ethereum (ERC-20)</SelectItem>
                  <SelectItem value="ton">TON</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <FormMessage>{errors?.network?.message}</FormMessage>
          </FormItem>
        )}
      />

      <p className="text-body-strong pt-2">{t("withdraw.note")}</p>
    </>
  );
};
