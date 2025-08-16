import { Page } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { Withdrawals } from "@/entities/withdraw-history/model/withdrawalsSlice.ts";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { getWithdrawHistory } from "@/features";

interface WithdrawStatus {
  status: string;
  backgroundCol: string;
}

export const WithdrawHistoryPage = () => {
  const { withdrawals, total } = useAppSelector((state: RootState) => state.withdrawals);
  const { id_tg } = useAppSelector((state: RootState) => state.user);

  const [page, setPage] = useState<number>(1);
  const containerRef: MutableRefObject<HTMLLIElement | null> = useRef<HTMLLIElement | null>(null);
  const observerRef: MutableRefObject<IntersectionObserver | null> =
    useRef<IntersectionObserver | null>(null);

  const dispatch = useAppDispatch();

  const checkStatus = (status: string): WithdrawStatus => {
    switch (status) {
      case "pending":
        return { status: "Ожидание", backgroundCol: "#c79f1a" };
      case "paid":
        return { status: "Выплачено", backgroundCol: "#228b22" };
      case "rejected":
        return { status: "Отказано", backgroundCol: "#721c24" };
      default:
        return { status: "", backgroundCol: "" };
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries, observer): void => {
        entries.forEach((entry): void => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);

            setPage(() => {
              const newLimit = page + 1;
              if (id_tg != null) {
                void dispatch(getWithdrawHistory({ id_tg, page: newLimit }));
              }
              return newLimit;
            });
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5,
      },
    );

    observerRef.current.observe(containerRef.current);

    if (withdrawals.length >= total) {
      observerRef.current.disconnect();
    }
  }, [withdrawals.length]);

  return (
    <Page className="grid grid-rows-[auto_1fr_auto] h-screen gap-y-6">
      <h1 className="text-title leading-none text-center">История</h1>

      <section className="w-full">
        <h2 className="text-heading mb-2">Транзакции</h2>

        <ul>
          {withdrawals.length === 0 ?
            <h2 className="text-white-heading text-center mt-[100px]">
              Вы ещё не совершили ни одной транзакции...
            </h2>
          : withdrawals.map((operation: Withdrawals, index, arr) => {
              const { id, status, network, amount, createdAt } = operation;

              const dateObj = new Date(createdAt);

              const formattedDate = new Intl.DateTimeFormat(navigator.language, {
                dateStyle: "short",
              }).format(dateObj);

              const formattedTime = new Intl.DateTimeFormat(navigator.language, {
                timeStyle: "short",
              }).format(dateObj);

              const currentStatus: WithdrawStatus = checkStatus(status);

              const isLast: boolean = index === arr.length - 1;
              return (
                <li key={id} ref={isLast ? containerRef : null}>
                  <article className="bg-[#161d27] w-full p-2 rounded-[6px] mb-5">
                    <header className="flex items-center justify-between mb-2">
                      <h3 className="text-operation">Операция #{id}</h3>

                      <span
                        role="status"
                        className="rounded-[6px] py-0.5 px-1 text-status"
                        style={{ backgroundColor: currentStatus.backgroundCol }}
                      >
                        {currentStatus.status}
                      </span>
                    </header>

                    <div className="flex items-center justify-between">
                      <p className="text-link-strong pr-2.5">Network: {network.toUpperCase()}</p>

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
