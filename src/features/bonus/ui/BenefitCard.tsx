import { Button } from "@/shared/ui";
// import { useTranslation } from "react-i18next";
import { Tasks } from "@/features/bonus/lib/types.ts";
import { useState } from "react";

type ActionState = "get" | "checking" | "completed";

export const BenefitCard = ({ title, reward, reward_issued, status, url, id, imageUrl }: Tasks) => {
  // const { t } = useTranslation();
  const [actionState, setActionState] = useState<ActionState>("get");

  const handleTaskExecution = (task: Tasks, actionLabel: string): void => {
    const { status, url, id } = task;
    console.log("status", status);
    console.log("id", id);
    console.log("actionLabel", actionLabel);

    switch (actionState) {
      case "get":
        window.open(url, "_blank");
        try {
          // TODO Запрос к API для получения checking состояния
          setActionState("checking");
        } catch (error) {
          console.error(error);
        }
        break;
      case "checking":
        try {
          // TODO Запрос к API для получения completed состояния
          setActionState("completed");
        } catch (error) {
          console.error(error);
        }
        break;
    }
  };

  return (
    <div className="bg-[#161d27] p-3  rounded-[12px] mb-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="bg-[#2180d4] p-1.5 w-[60px] h-[60px] min-w-[60px] rounded-[12px]">
            <img src={imageUrl} alt="image" />
          </div>

          <p className="max-w-[100px] mr-1.5 sm:text-[16px] text-[14px]">{title}</p>
        </div>

        <Button
          variant={reward_issued ? "positiveDisabled" : "get"}
          disabled={reward_issued}
          onClick={(): void => void handleTaskExecution({ id, url, status }, actionState)}
        >
          {/*{t("bonus.get") as string | undefined}*/}
          {actionState}
        </Button>
      </div>

      <p className="flex justify-end text-link-strong">{parseFloat(reward ?? "0").toFixed(6)}</p>
    </div>
  );
};
