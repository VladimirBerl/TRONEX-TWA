import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { checkLengthNumbers } from "@/shared/lib/checkLengthNumber.tsx";

export const TonBalance = () => {
  const { farm_balance, investment_balance } = useSelector((state: RootState) => state.user);

  return (
    <section className="flex gap-2.5 justify-center items-center mb-2.5">
      <div className="max-w-[110px] leading-none text-center">
        <h2 className="text-heading-balance text-center mb-2">Investment balance</h2>

        <span className="text-balance leading-none pt-2">
          {checkLengthNumbers(investment_balance.toFixed(6), 12, 22, 2)}
        </span>
      </div>

      <div className="max-w-[110px] leading-none text-center">
        <h2 className="text-heading-balance text-center mb-2">Farm balance</h2>

        <span className="text-balance leading-none pt-2">
          {checkLengthNumbers(farm_balance.toFixed(6), 12, 22, 2)}
        </span>
      </div>
    </section>
  );
};
