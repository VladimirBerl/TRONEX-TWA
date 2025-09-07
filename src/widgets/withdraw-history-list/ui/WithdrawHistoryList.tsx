import { useTranslation } from "react-i18next";
import { WithdrawInfo } from "@/shared/types/withdraw.ts";
import { WithdrawHistoryItem } from "@/entities";
import { useEffect, useState } from "react";
import { useAppSelector, useIntersectionObserver } from "@/shared/hooks";
import { RootState } from "@/app/store/store.ts";
import { useLazyGetWithdrawHistoryQuery } from "@/shared/api/api.ts";

interface WithdrawStatus {
  status: string;
  backgroundCol: string;
}

export const WithdrawHistoryList = () => {
  const { t } = useTranslation();
  const { withdrawals, total } = useAppSelector((state: RootState) => state.withdrawals);
  const { id_tg } = useAppSelector((state: RootState) => state.user);
  const [, setPage] = useState(1);
  const [getWithdrawHistory] = useLazyGetWithdrawHistoryQuery();

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
    if (id_tg) void getWithdrawHistory({ id_tg, page: 1 });
  }, []);

  const targetRef = useIntersectionObserver<HTMLLIElement, WithdrawInfo>({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
    enabled: withdrawals.length < total,
    items: withdrawals,
    total: total,
    handleGetItems: ({ id_tg, page }) => {
      if (id_tg != null) void getWithdrawHistory({ id_tg, page });
    },
    setPage: setPage,
  });

  if (withdrawals.length === 0) {
    return (
      <h2 className="text-white-heading text-center mt-[100px]">
        {t("withdrawHistory.noHistory")}
      </h2>
    );
  }

  return (
    <ul>
      {withdrawals.map((operation: WithdrawInfo, index, arr) => {
        const { id, status, network, amount, createdAt } = operation;
        const currentStatus: WithdrawStatus = checkStatus(status);
        const isLast: boolean = index === arr.length - 1;

        return (
          <li key={id} ref={isLast ? targetRef : null}>
            <WithdrawHistoryItem
              id={id}
              network={network}
              amount={amount}
              createdAt={createdAt}
              currentStatus={currentStatus}
            />
          </li>
        );
      })}
    </ul>
  );
};
