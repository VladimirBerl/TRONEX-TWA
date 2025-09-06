import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { useWithdrawMutation } from "@/shared/api/api.ts";
import { WithdrawFormValues } from "@/features";
import { UseFormReturn } from "react-hook-form";
import { setNewBalance } from "@/entities/user/model/userSlice.ts";

export const useWithdrawTransaction = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { id_tg, investment_balance, farm_balance } = useAppSelector(
    (state: RootState) => state.user,
  );
  const [withdraw] = useWithdrawMutation();

  return async (data: WithdrawFormValues, form: UseFormReturn<WithdrawFormValues>) => {
    const { withdrawAmount, walletAddress } = data;

    const amount = parseFloat(withdrawAmount);
    const farmBal = parseFloat(farm_balance);
    const investBal = parseFloat(investment_balance);

    const totalBalance = farmBal + investBal;

    if (amount > totalBalance) {
      form.setError("withdrawAmount", {
        type: "manual",
        message: t("withdraw.insufficientBalance"),
      });
      return;
    }

    try {
      if (!id_tg) return;

      let newFarmBalance = farmBal;
      let newInvestBalance = investBal;

      if (amount <= farmBal) {
        newFarmBalance -= amount;
      } else {
        newFarmBalance = 0;
        newInvestBalance -= amount - farmBal;
      }

      await withdraw({ id_tg, walletAddress, withdrawAmount });

      dispatch(
        setNewBalance({
          newFarmBalance: newFarmBalance.toFixed(6),
          newInvestmentBalance: newInvestBalance.toFixed(6),
        }),
      );

      alert(t("withdraw.withdrawn", { amount: withdrawAmount }));

      form.reset({ withdrawAmount: "" });
    } catch (error) {
      console.error(error);
    }
  };
};
