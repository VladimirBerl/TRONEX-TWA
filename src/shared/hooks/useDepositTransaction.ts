import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTonAddress, useTonConnectUI } from "@tonconnect/ui-react";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { deposit, DepositFormValues } from "@/features";
import { UseFormReturn } from "react-hook-form";
import { Buffer } from "buffer";
import { Cell } from "@ton/core";

export const useDepositTransaction = () => {
  const { t } = useTranslation();
  const [tonConnectUI] = useTonConnectUI();
  const address = useTonAddress();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id_tg, wallet_address } = useSelector((state: RootState) => state.user);
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
      const bocCell = Cell.fromBoc(Buffer.from(result.boc, "base64"))[0];
      const hash = bocCell.hash().toString("hex");

      if (id_tg)
        await dispatch(deposit({ id_tg, amount: data.depositAmount, wallet_address, hash }));

      form.reset({ depositAmount: "" });
      void navigate("/deposit", { replace: true });
      alert(t("deposit.transactionSent"));
    } catch (e) {
      console.error(e);
      alert(t("deposit.transactionFailed"));
    }
  };
};
