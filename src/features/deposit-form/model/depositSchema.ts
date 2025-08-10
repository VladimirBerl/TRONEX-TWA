import z from "zod";

export const depositSchema = z.object({
  depositAmount: z
    .string()
    .nonempty("Введите сумму")
    .refine((val) => !isNaN(Number(val)), { message: "Должно быть числом" })
    .transform((val) => Number(val))
    .refine((num) => num >= 1 && num <= 9999, {
      message: "Сумма должна быть от 1 до 9999",
    })
    .transform((num) => num.toString()),
});

export type DepositFormValues = z.infer<typeof depositSchema>;
