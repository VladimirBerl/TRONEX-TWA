import { Page } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { Deposit } from "@/entities/deposit-history/model/depositHistorySlice.ts";
import { useEffect, useState } from "react";
import { getDepositHistory } from "@/features";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver.ts";
import { MobileNavBar } from "@/widgets";

export const DepositHistoryPage = () => {
  const [, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();

  const { deposits, total } = useAppSelector((state: RootState) => state.deposits);
  const { id_tg } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    if (id_tg != null) void dispatch(getDepositHistory({ id_tg, page: 1 }));
  }, []);

  const targetRef = useIntersectionObserver<HTMLLIElement, Deposit>({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
    enabled: deposits.length < total,
    items: deposits,
    total: total,
    handleGetItems: ({ id_tg, page }) => {
      void dispatch(getDepositHistory({ id_tg, page }));
    },
    setPage: setPage,
  });

  return (
    <Page className="grid grid-rows-[auto_1fr] gap-y-6 h-screen relative">
      <h1 className="text-title text-center leading-none">Пополнения</h1>

      <section className="w-full">
        <h2 className="text-heading mb-2">Пополнения</h2>

        <ul>
          {deposits.length === 0 ?
            <h2 className="text-white-heading text-center mt-[100px]">
              Вы ещё не совершили ни одного пополнения...
            </h2>
          : deposits.map((operation: Deposit, index, arr) => {
              const { id, network, amount, createdAt } = operation;

              const dateObj = new Date(createdAt);

              const formattedDate = new Intl.DateTimeFormat(navigator.language, {
                dateStyle: "short",
              }).format(dateObj);

              const formattedTime = new Intl.DateTimeFormat(navigator.language, {
                timeStyle: "short",
              }).format(dateObj);

              const isLast: boolean = index === arr.length - 1;

              return (
                <li key={id} ref={isLast ? targetRef : null}>
                  <article className="bg-[#161d27] w-full px-2 py-4 rounded-[6px] mb-3">
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

      <div className="sticky bottom-0 w-full">
        <MobileNavBar page="/deposit" />
      </div>
    </Page>
  );
};
