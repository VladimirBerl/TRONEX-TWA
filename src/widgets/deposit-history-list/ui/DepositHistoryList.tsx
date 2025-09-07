import { useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { DepositInfo } from "@/entities/deposit-history/model/depositHistorySlice.ts";
import { useEffect, useState } from "react";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver.ts";
import { useLazyGetDepositHistoryQuery } from "@/shared/api/api.ts";
import { DepositHistoryItem } from "@/entities";
import { useTranslation } from "react-i18next";

export const DepositHistoryList = () => {
  const { t } = useTranslation();
  const { deposits, total } = useAppSelector((state: RootState) => state.deposits);
  const { id_tg } = useAppSelector((state: RootState) => state.user);
  const [, setPage] = useState(1);
  const [getDepositHistory] = useLazyGetDepositHistoryQuery();

  useEffect(() => {
    if (id_tg != null) void getDepositHistory({ id_tg, page: 1 });
  }, []);

  const targetRef = useIntersectionObserver<HTMLLIElement, DepositInfo>({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
    enabled: deposits.length < total,
    items: deposits,
    total: total,
    handleGetItems: ({ id_tg, page }) => {
      if (id_tg != null) void getDepositHistory({ id_tg, page });
    },
    setPage: setPage,
  });

  if (deposits.length === 0) {
    return (
      <h2 className="text-white-heading text-center mt-[100px]">{t("depositHistory.noHistory")}</h2>
    );
  }

  return (
    <ul>
      {deposits.map((operation: DepositInfo, index, arr) => {
        const { id, network, amount, createdAt } = operation;
        const isLast = index === arr.length - 1;

        return (
          <li key={id} ref={isLast ? targetRef : null}>
            <DepositHistoryItem id={id} network={network} amount={amount} createdAt={createdAt} />
          </li>
        );
      })}
    </ul>
  );
};
