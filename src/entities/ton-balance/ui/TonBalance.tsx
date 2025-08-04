import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";

export const TonBalance = () => {
  const { farm_balance, investment_balance } = useSelector((state: RootState) => state.user);

  return (
    <section className="flex gap-10">
      <div>
        <h1 className="text-heading text-center">Investment balance</h1>
        <p className="text-center-heading block leading-none">{ investment_balance.toFixed(6) }</p>
      </div>

      <div>
        <h1 className="text-heading text-center">Farm balance</h1>
        <p className="text-center-heading block leading-none">{ farm_balance.toFixed(6) }</p>
      </div>
    </section>
  );
};
