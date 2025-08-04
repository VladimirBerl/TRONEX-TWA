import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";

export const TonBalance = () => {
  const { farm_balance, investment_balance } = useSelector((state: RootState) => state.user);

  return (
    <section className="flex gap-2.5">
      <div className="max-w-[110px] leading-none">
        <h1 className="text-heading-balance text-center">Investment balance</h1>
        <p className="text-balance leading-none pt-2">{investment_balance.toFixed(6)}</p>
      </div>

      <div className="max-w-[110px] leading-none">
        <h1 className="text-heading-balance text-center">Farm balance</h1>
        <p className="text-balance leading-none pt-2">{farm_balance.toFixed(6)}</p>
      </div>
    </section>
  );
};
