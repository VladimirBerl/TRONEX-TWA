import z from "zod";
import i18n from "@/shared/config/i18n/i18n.ts";

export const depositSchema = z.object({
  depositAmount: z
    .string()
    .nonempty(i18n.t("deposit.enterAmount"))
    .refine((val) => !isNaN(Number(val)), {
      message: i18n.t("deposit.mustBeNumber"),
    })
    .transform((val) => Number(val))
    .refine((num) => num >= 1 && num <= 9999, {
      message: i18n.t("deposit.rangeError"),
    })
    .transform((num) => num.toString()),
});

export type DepositFormValues = z.infer<typeof depositSchema>;
