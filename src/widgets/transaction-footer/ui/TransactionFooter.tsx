import { Button } from "@/shared/ui";
import { ReactComponent as Ton } from "@/shared/assets/icons/Ton.svg";

interface TransactionFooterProps {
  btnText: string;
}

export const TransactionFooter = ({ btnText }: TransactionFooterProps) => {
  return (
    <footer className="fixed bottom-0 left-0 w-full px-4 pb-4">
      <div className="w-full flex flex-col justify-end">
        <div className="flex justify-start gap-5 mb-5">
          <div className="w-[50px] h-[50px] rounded-full bg-[#18A7FB] flex items-center justify-center">
            <Ton/>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-[#535A64] font-semibold text-[12px]">Payment Method</h3>
            <p className="font-semibold">Crypto Wallet</p>
          </div>
        </div>

        <Button className="uppercase text-[18px] font-semibold px-3.5">{ btnText }</Button>
      </div>
    </footer>
  );
};
