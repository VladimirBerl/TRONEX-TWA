import { Page } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { Deposit } from "@/entities/deposit-history/model/depositHistorySlice.ts";
import { useEffect, useState } from "react";
import { getDepositHistory } from "@/features";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver.ts";

export const DepositHistoryPage = () => {
  const [, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();

  const { deposits, total } = useAppSelector((state: RootState) => state.deposits);
  const { id_tg } = useAppSelector((state: RootState) => state.user);
  // TODO clean later
  // const containerRef: MutableRefObject<HTMLLIElement | null> = useRef<HTMLLIElement | null>(null);
  // const observerRef: MutableRefObject<IntersectionObserver | null> =
  //   useRef<IntersectionObserver | null>(null);

  const loadMore = (): void => {
    setPage((prevPage: number): number => {
      const newPage: number = prevPage + 1;
      if (id_tg) void dispatch(getDepositHistory({ id_tg, page: newPage }));
      return newPage;
    });
  };

  useEffect(() => {
    if (id_tg != null) void dispatch(getDepositHistory({ id_tg, page: 1 }));
  }, []);

  const targetRef = useIntersectionObserver<HTMLLIElement>({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
    enabled: deposits.length < total,

    onIntersect: (): void => {
      loadMore();
    },
  });

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
    </Page>
  );
};

// TODO clean later
// useEffect(() => {
//   if (!containerRef.current) return;
//
//   observerRef.current = new IntersectionObserver(
//     (entries, observer): void => {
//       entries.forEach((entry): void => {
//         if (entry.isIntersecting) {
//           observer.unobserve(entry.target);
//           console.log("Сняли наблюдатель с элемента:", entry.target);
//
//           setPage((prevPage) => {
//             const newPage = prevPage + 1;
//             console.log("newPage", newPage);
//             if (id_tg) {
//               void dispatch(getDepositHistory({ id_tg, page: newPage }));
//             }
//             return newPage;
//           });
//         }
//       });
//     },
//     {
//       root: null,
//       rootMargin: "0px",
//       threshold: 0.5,
//     },
//   );
//   console.log("Повесили наблюдатель на элемент:", containerRef.current);
//   observerRef.current.observe(containerRef.current);
//
//   if (deposits.length >= total) {
//     console.log("Наблюдатель отключён!");
//     observerRef.current.disconnect();
//   }
// }, [deposits.length]);
