import { Page } from "@/shared/ui";
import { useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { Deposit } from "@/entities/deposit-history/model/depositHistorySlice.ts";

export const DepositHistoryPage = () => {
  const { deposits } = useAppSelector((state: RootState) => state.deposits);

  return (
    <Page className="grid grid-rows-[auto_1fr] gap-y-6 h-screen">
      <h1 className="text-title text-center leading-none">Пополнения</h1>

      <section className="w-full">
        <h2 className="text-heading mb-2">Пополнения</h2>

        <ul>
          {deposits.length === 0 ?
            <h2 className="text-white-heading text-center mt-[100px]">
              Вы ещё не совершили ни одного пополнения...
            </h2>
          : [...deposits].reverse().map((operation: Deposit) => {
              const { id, network, amount, createdAt } = operation;

              const dateObj = new Date(createdAt);

              const formattedDate = new Intl.DateTimeFormat(navigator.language, {
                dateStyle: "short",
              }).format(dateObj);

              const formattedTime = new Intl.DateTimeFormat(navigator.language, {
                timeStyle: "short",
              }).format(dateObj);

              return (
                <li key={id}>
                  <article className="bg-[#161d27] w-full p-2 rounded-[6px] mb-5">
                    <div className="flex justify-between">
                      <header className="flex flex-col justify-between gap-2 pr-2.5">
                        <h3 className="text-operation leading-none">Операция #{id}</h3>
                        <p className="text-link-strong">Network: {network.toUpperCase()}</p>
                      </header>

                      <div className="flex items-center justify-between">
                        <div className="text-end">
                          <p className="text-link-strong">Количество: {amount.slice(0, 8)}</p>

                          <p className="text-data">
                            Дата:{" "}
                            <time dateTime={createdAt}>
                              {formattedDate} ({formattedTime})
                            </time>
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              );
            })
          }
        </ul>
      </section>
    </Page>
  );
};
