import { z } from "zod";

export const withdrawSchema = z
  .object({
    withdrawAmount: z
      .string()
      .nonempty("Введите сумму")
      .refine((val) => !isNaN(Number(val)), { message: "Должно быть числом" })
      .transform((val) => Number(val))
      .refine((num) => num >= 0.5 && num <= 9999, {
        message: "Сумма должна быть от 0.5 до 9999",
      })
      .transform((num) => num.toString()),

    walletAddress: z.string().nonempty("Введите адрес кошелька"),

    network: z.string().nonempty("Выберите сеть"),
  })
  .superRefine((data, ctx) => {
    const { network, walletAddress } = data;

    let isValid = false;

    switch (network) {
      case "ethereum":
      case "bsc":
        isValid = /^0x[a-fA-F0-9]{40}$/.test(walletAddress);
        break;
      case "ton":
        isValid = /^[0-9A-Za-z-_]{48,52}$/.test(walletAddress);
        break;
    }

    if (!isValid) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["walletAddress"],
        message: "Неверный формат адреса",
      });
    }
  });

export type WithdrawFormValues = z.infer<typeof withdrawSchema>;
