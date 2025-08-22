import { Page } from "@/shared/ui";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { Withdrawals } from "@/entities/withdraw-history/model/withdrawalsSlice.ts";
import { useEffect, useState } from "react";
import { getWithdrawHistory } from "@/features";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver.ts";
import { MobileNavBar } from "@/widgets";
import { useTranslation } from "react-i18next";

interface WithdrawStatus {
  status: string;
  backgroundCol: string;
}

export const WithdrawHistoryPage = () => {
  const { withdrawals, total } = useAppSelector((state: RootState) => state.withdrawals);
  const { id_tg } = useAppSelector((state: RootState) => state.user);
  const [, setPage] = useState<number>(1);
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const checkStatus = (status: string): WithdrawStatus => {
    switch (status) {
      case "pending":
        return { status: t("withdrawHistory.status.pending"), backgroundCol: "#c79f1a" };
      case "paid":
        return { status: t("withdrawHistory.status.paid"), backgroundCol: "#228b22" };
      case "rejected":
        return { status: t("withdrawHistory.status.rejected"), backgroundCol: "#721c24" };
      default:
        return { status: "", backgroundCol: "" };
    }
  };

  useEffect((): void => {
    if (id_tg) void dispatch(getWithdrawHistory({ id_tg }));
  }, []);

  const targetRef = useIntersectionObserver<HTMLLIElement, Withdrawals>({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
    enabled: withdrawals.length < total,
    items: withdrawals,
    total: total,
    handleGetItems: ({ id_tg, page }) => {
      void dispatch(getWithdrawHistory({ id_tg, page }));
    },
    setPage: setPage,
  });

  return (
    <Page className="grid grid-rows-[auto_1fr_auto] h-screen gap-y-6">
      <h1 className="text-title leading-none text-center">{t("withdrawHistory.title")}</h1>

      <section className="w-full">
        <h2 className="text-heading mb-2">{t("withdrawHistory.transactions")}</h2>

        <ul>
          {withdrawals.length === 0 ?
            <h2 className="text-white-heading text-center mt-[100px]">
              {t("withdrawHistory.noHistory")}
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
                <li key={id} ref={isLast ? targetRef : null}>
                  <article className="bg-[#161d27] w-full p-2 rounded-[6px] mb-4">
                    <header className="flex items-center justify-between mb-2">
                      <h3 className="text-operation">{t("withdrawHistory.operation", { id })}</h3>

                      <span
                        role="status"
                        className="rounded-[6px] py-0.5 px-1 text-status"
                        style={{ backgroundColor: currentStatus.backgroundCol }}
                      >
                        {currentStatus.status}
                      </span>
                    </header>

                    <div className="flex items-center justify-between">
                      <p className="text-link-strong pr-2.5">
                        {t("withdrawHistory.network")}: {network.toUpperCase()}
                      </p>

                      <div className="text-end">
                        <p className="text-link-strong">
                          {t("withdrawHistory.amount")}: {amount.slice(0, 8)}
                        </p>

                        <p className="text-data">
                          {t("withdrawHistory.date")}:{" "}
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

      <div className="sticky bottom-0 w-full">
        <MobileNavBar page="/deposit" />
      </div>
    </Page>
  );
};
