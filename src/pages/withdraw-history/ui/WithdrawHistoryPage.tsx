import { Page } from "@/shared/ui";
import { useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { WithdrawHistoryInfo } from "@/features/withdraw-history/model/withdrawSlice.ts";

interface WithdrawStatus {
  status: string;
  backgroundCol: string;
}

export const WithdrawHistoryPage = () => {
  const withdraw_history = useAppSelector((state: RootState) => state.withdraw_history);

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

  return (
    <Page className="grid grid-rows-[auto_1fr] h-screen gap-y-6">
      <h1 className="text-title leading-none text-center">История</h1>

      <section className="w-full">
        <h2 className="text-heading mb-2">Транзакции</h2>

        <ul>
          {[...withdraw_history].reverse().map((operation: WithdrawHistoryInfo) => {
            const { id, status, network, amount, createdAt } = operation;

            const dateObj = new Date(createdAt);

            const formattedDate = new Intl.DateTimeFormat(navigator.language, {
              dateStyle: "short",
            }).format(dateObj);

            const formattedTime = new Intl.DateTimeFormat(navigator.language, {
              timeStyle: "short",
            }).format(dateObj);

            const currentStatus: WithdrawStatus = checkStatus(status);

            return (
              <li key={id}>
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
          })}
        </ul>
      </section>
    </Page>
  );
};
