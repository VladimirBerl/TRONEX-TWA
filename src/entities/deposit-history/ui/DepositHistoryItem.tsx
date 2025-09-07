import { useTranslation } from "react-i18next";

interface DepositHistoryItemProps {
  id: number;
  network: string;
  amount: string;
  createdAt: string;
}

export const DepositHistoryItem = ({ id, network, amount, createdAt }: DepositHistoryItemProps) => {
  const { t } = useTranslation();
  const dateObj = new Date(createdAt);

  const formattedDate = new Intl.DateTimeFormat(navigator.language, {
    dateStyle: "short",
  }).format(dateObj);

  const formattedTime = new Intl.DateTimeFormat(navigator.language, {
    timeStyle: "short",
  }).format(dateObj);

  return (
    <article className="bg-[#161d27] w-full px-2 py-4 rounded-[6px] mb-3">
      <div className="flex justify-between">
        <header className="flex flex-col justify-between gap-2 pr-2.5">
          <h3 className="text-operation leading-none">{t("depositHistory.operation", { id })}</h3>

          <p className="text-link-strong">
            {t("depositHistory.network")}: {network.toUpperCase()}
          </p>
        </header>

        <div className="flex items-center justify-between">
          <div className="text-end">
            <p className="text-link-strong">
              {t("depositHistory.amount")}: {amount.slice(0, 8)}
            </p>

            <p className="text-data">
              {t("depositHistory.date")}:{" "}
              <time dateTime={createdAt}>
                {formattedDate} ({formattedTime})
              </time>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};
