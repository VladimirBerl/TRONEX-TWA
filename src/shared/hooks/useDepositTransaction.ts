import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { RootState } from "@/app/store/store.ts";
import { DepositFormValues } from "@/features";
import { UseFormReturn } from "react-hook-form";
import { useDepositMutation } from "@/shared/api/api.ts";
import { setInvestmentBalance } from "@/entities/user/model/userSlice.ts";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppDispatch.ts";

export const useDepositTransaction = () => {
  const { t } = useTranslation();
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id_tg, wallet_address, investment_balance } = useAppSelector(
    (state: RootState) => state.user,
  );
  const [deposit] = useDepositMutation();
  const WALLET_ADDRESS = "UQAVOcL-9aRmHxodpLjMU4BIcbP1EdC-XqnhC0vaUISnmnAS";

  return async (data: DepositFormValues, form: UseFormReturn<DepositFormValues>) => {
    if (!address) return alert(t("deposit.connectWallet"));
    if (!wallet_address) return alert(t("deposit.addressMissing"));

    const amountTON = parseFloat(data.depositAmount);
    if (isNaN(amountTON) || amountTON <= 0) return alert(t("deposit.invalidAmount"));

    if (!window.confirm(t("deposit.confirm", { amount: amountTON, wallet: WALLET_ADDRESS })))
      return;

    try {
      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
          {
            address: WALLET_ADDRESS,
            amount: (amountTON * 1_000_000_000).toString(),
          },
        ],
      };

      const result = await tonConnectUI.sendTransaction(transaction);
      const boc = result.boc;
      // const bocCell = Cell.fromBoc(Buffer.from(result.boc, "base64"))[0];
      // const hash = bocCell.hash().toString("hex");

      if (id_tg) {
        await deposit({ id_tg, amount: data.depositAmount, wallet_address, boc });

        const newBalance = parseFloat(investment_balance) + parseFloat(data.depositAmount);
        dispatch(setInvestmentBalance(newBalance.toString()));
      }

      form.reset({ depositAmount: "" });
      void navigate("/deposit", { replace: true });
      alert(t("deposit.transactionSent"));
    } catch (e) {
      console.error(e);
      alert(t("deposit.transactionFailed"));
    }
  };
};
