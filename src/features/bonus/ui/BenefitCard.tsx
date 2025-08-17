import { Button } from "@/shared/ui";
import { Task } from "@/entities/bonus/model/tasksSlice.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts";
import { checkTask } from "@/features/bonus/model/checkThunk.ts";

const statusToLabelMap: Record<string, string> = {
  pending: "get",
  checking: "checking",
  completed: "completed",
};

export const BenefitCard = ({ title, reward, reward_issued, status, url, id, imageUrl }: Task) => {
  const { id_tg } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const handleTaskExecution = (task: Pick<Task, "id" | "status" | "url">): void => {
    const { url, status, id } = task;

    switch (status) {
      case "pending":
        window.open(url, "_blank");

        if (id_tg != null && id != null) void dispatch(checkTask({ id_tg, id }));
        break;
      case "checking":
        if (id_tg != null && id != null) void dispatch(checkTask({ id_tg, id }));
        break;
      case "completed":
        break;
    }
  };

  return (
    <article className="bg-[#161d27] p-3 rounded-[12px] mb-4">
      <div className="flex items-center justify-between">
        <header className="flex gap-2 items-center">
          <div className="border-[#18a7fb] border-dashed border-[1px] p-1 w-[60px] h-[60px] min-w-[60px] rounded-[12px]">
            <img className="w-full h-full object-cover" src={imageUrl} alt="image" />
          </div>

          <p className="max-w-[100px] mr-1.5 sm:text-[16px] text-[14px] wrap-break-word">{title}</p>
        </header>

        <Button
          variant={reward_issued ? "positiveDisabled" : "get"}
          disabled={reward_issued}
          onClick={(): void => void handleTaskExecution({ id, status, url })}
        >
          {statusToLabelMap[status] ?? "get"}
        </Button>
      </div>

      <p className="flex justify-end text-link-strong">{parseFloat(reward ?? "0").toFixed(6)}</p>
    </article>
  );
};
