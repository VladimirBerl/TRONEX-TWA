import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { useWithdrawMutation } from "@/shared/api/api.ts";
import { WithdrawFormValues } from "@/features";
import { UseFormReturn } from "react-hook-form";

export const useWithdrawTransaction = () => {
  const { t } = useTranslation();
  const { id_tg, investment_balance } = useAppSelector((state: RootState) => state.user);
  const [withdraw] = useWithdrawMutation();

  return async (data: WithdrawFormValues, form: UseFormReturn<WithdrawFormValues>) => {
    const { withdrawAmount, walletAddress } = data;

    if (parseFloat(withdrawAmount) > parseFloat(investment_balance)) {
      form.setError("withdrawAmount", {
        type: "manual",
        message: t("withdraw.insufficientBalance"),
      });
      return;
    }

    try {
      if (!id_tg) return;

      await withdraw({ id_tg, walletAddress, withdrawAmount }).unwrap();
      alert(t("withdraw.withdrawn", { amount: withdrawAmount }));

      form.reset({ withdrawAmount: "" });
    } catch (error) {
      console.error(error);
    }
  };
};
