import { useTranslation } from "react-i18next";

interface WithdrawHistoryItemProps {
  id: number;
  network: string;
  amount: string;
  createdAt: string;
  currentStatus: {
    status: string;
    backgroundCol: string;
  };
}

export const WithdrawHistoryItem = ({
  id,
  network,
  amount,
  createdAt,
  currentStatus,
}: WithdrawHistoryItemProps) => {
  const { t } = useTranslation();
  const dateObj = new Date(createdAt);

  const formattedDate = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "short",
  }).format(dateObj);

  const formattedTime = new Intl.DateTimeFormat(navigator.language, {
    timeStyle: "short",
  }).format(dateObj);

  return (
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
  );
};
