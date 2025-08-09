import z from "zod";

export const withdrawSchema = z.object({
  withdrawAmount: z
    .string()
    .nonempty("Введите сумму")
    .refine((val) => !isNaN(Number(val)), { message: "Должно быть числом" })
    .transform((val) => Number(val))
    .refine((num) => num >= 1 && num <= 9999, {
      message: "Сумма должна быть от 1 до 9999",
    })
    .transform((num) => num.toString()),

  walletAddress: z.string().nonempty("Введите адрес кошелька"),

  network: z.string().nonempty("Выберите сеть"),
});

export type WithdrawFormValues = z.infer<typeof withdrawSchema>;
