import { Button } from "@/shared/ui";
import { Task } from "@/entities/bonus/model/tasksSlice.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts";
import { checkTask } from "@/features/bonus/model/checkThunk.ts";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const BenefitCard = ({ title, reward, reward_issued, status, url, id, imageUrl }: Task) => {
  const { t } = useTranslation();
  const { id_tg } = useSelector((state: RootState) => state.user);
  const [localStatus, setLocalStatus] = useState(status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLocalStatus(status);
  }, [status]);

  const statusToLabelMap: Record<string, string> = {
    completed: t("bonus.status.completed"),
    checking: t("bonus.status.checking"),
    get: t("bonus.status.get"),
  };

  const handleTaskExecution = async (id: number, url: string) => {
    switch (localStatus) {
      case "pending":
        if (id_tg != null && id != null) {
          await dispatch(checkTask({ id_tg, id }));
          window.open(url, "_blank");
        }
        break;
      case "checking":
        if (id_tg != null && id != null) {
          await dispatch(checkTask({ id_tg, id }));
        }
        break;
      case "completed":
        break;
    }
  };

  return (
    <article className="bg-[#161d27] p-2 rounded-[12px]">
      <div className="flex items-center justify-between">
        <header className="flex gap-2 items-center">
          <div className="border-[#18a7fb] border-dashed border-[1px] w-[90px] min-w-[90px]  h-full rounded-[12px]">
            <img className="w-full h-full object-cover rounded-[12px]" src={imageUrl} alt="image" />
          </div>

          <p className="max-w-[100px] mr-1.5 sm:text-[16px] text-[14px] wrap-break-word">{title}</p>
        </header>

        <div className="flex flex-col gap-y-3">
          <Button
            variant={status === "completed" || reward_issued ? "positiveDisabled" : "get"}
            disabled={reward_issued}
            onClick={(): void => void handleTaskExecution(id, url)}
          >
            {statusToLabelMap[status] ?? t("bonus.status.get")}
          </Button>

          <p className="flex justify-end text-link-strong">
            {parseFloat(reward ?? "0").toFixed(6)}
          </p>
        </div>
      </div>
    </article>
  );
};
