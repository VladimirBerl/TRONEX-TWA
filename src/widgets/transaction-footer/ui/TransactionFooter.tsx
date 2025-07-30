import { Button } from "@/shared/ui";
import { ReactComponent as Ton } from "@/shared/assets/icons/Ton.svg";
import { useTranslation } from "react-i18next";

interface TransactionFooterProps {
  btnText: string;
}

export const TransactionFooter = ({ btnText }: TransactionFooterProps) => {
  const { t } = useTranslation()

  return (
    <footer className="fixed bottom-0 left-0 w-full px-4 pb-4">
      <div className="w-full flex flex-col justify-end">
        <div className="flex justify-start gap-5 mb-5">
          <div className="w-[50px] h-[50px] rounded-full bg-[#18A7FB] flex items-center justify-center">
            <Ton/>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-body-strong">{ t("transaction_footer.payment_method") }</h3>
            <p className="font-semibold">{ t("transaction_footer.crypto_wallet") }</p>
          </div>
        </div>

        <Button className="text-button-strong px-3.5">{ btnText }</Button>
      </div>
    </footer>
  );
};
