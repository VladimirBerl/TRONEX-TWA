import { z } from "zod";
import i18n from "@/shared/config/i18n/i18n.ts";

export const withdrawSchema = z.object({
  withdrawAmount: z
    .string()
    .nonempty(i18n.t("withdraw.enterAmount"))
    .refine((val) => !isNaN(Number(val)), {
      message: i18n.t("withdraw.mustBeNumber"),
    })
    .transform((val) => Number(val))
    .refine((num) => num >= 0.5 && num <= 9999, {
      message: i18n.t("withdraw.rangeError", { min: 0.5, max: 9999 }),
    })
    .transform((num) => num.toString()),

  walletAddress: z
    .string()
    .nonempty(i18n.t("withdraw.addressRequired"))
    .refine((val) => /^[0-9A-Za-z-_]{48,52}$/.test(val), {
      message: i18n.t("withdraw.invalidAddress"),
    }),
});

export type WithdrawFormValues = z.infer<typeof withdrawSchema>;
