import { z } from "zod";

export const withdrawSchema = z.object({
  withdrawAmount: z
    .string()
    .nonempty("Введите сумму")
    .refine((val) => !isNaN(Number(val)), { message: "Должно быть числом" })
    .transform((val) => Number(val))
    .refine((num) => num >= 0.5 && num <= 9999, {
      message: "Сумма должна быть от 0.5 до 9999",
    })
    .transform((num) => num.toString()),

  walletAddress: z
    .string()
    .nonempty("Введите адрес кошелька")
    .refine((val) => /^[0-9A-Za-z-_]{48,52}$/.test(val), {
      message: "Неверный формат адреса TON",
    }),
});

export type WithdrawFormValues = z.infer<typeof withdrawSchema>;
