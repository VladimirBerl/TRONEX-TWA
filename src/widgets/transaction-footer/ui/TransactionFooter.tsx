import { Button } from "@/shared/ui";
import { ReactComponent as Ton } from "@/shared/assets/icons/ton-icon.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/shared/config/navigation.ts";
import { TFunction } from "i18next";

type TransactionType = "deposit" | "withdraw";

interface TransactionFooterProps {
  btnText: string;
  buttonValue: string;
  type: TransactionType;
}

const getConfig = (
  t: TFunction,
): Record<TransactionType, { historyText: string; path: string }> => ({
  deposit: {
    historyText: t("deposit.historyText"),
    path: PATHS.DEPOSIT_HISTORY,
  },
  withdraw: {
    historyText: t("withdraw.historyText"),
    path: PATHS.WITHDRAW_HISTORY,
  },
});

export const TransactionFooter = ({ btnText, buttonValue, type }: TransactionFooterProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const config = getConfig(t);

  return (
    <>
      <footer className="flex w-full flex-wrap gap-y-2">
        <div className="w-full flex flex-col justify-end">
          <div className="flex justify-start gap-5 mb-5">
            <div className="w-[50px] h-[50px] rounded-full bg-[#18A7FB] flex items-center justify-center">
              <Ton />
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="text-body-strong">{t("transaction_footer.payment_method")}</h3>
              <p className="font-semibold">{t("transaction_footer.crypto_wallet")}</p>
            </div>
          </div>

          <Button variant="action" type="submit" hover="buyLevel">
            {`${btnText} ${buttonValue} TON`}
          </Button>
        </div>

        <Button
          variant="transparent"
          type="button"
          className="h-fit text-transaction text-center w-full no-hover"
          onClick={(): void => void navigate(config[type].path)}
        >
          {config[type].historyText}
        </Button>
      </footer>
    </>
  );
};
