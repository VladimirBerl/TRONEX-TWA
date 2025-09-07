import { BonusTask } from "@/shared/types/tasks.ts";
import { BenefitCard } from "@/features";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { useAppSelector, useIntersectionObserver } from "@/shared/hooks";
import { useEffect, useState } from "react";
import { useLazyGetBonusTasksQuery } from "@/shared/api/api.ts";
import { useTranslation } from "react-i18next";

export const BonusTaskList = () => {
  const { t } = useTranslation();
  const { tasks, total } = useSelector((state: RootState) => state.tasks);
  const { id_tg } = useAppSelector((state: RootState) => state.user);
  const [, setPage] = useState(1);
  const [getBonusTasks] = useLazyGetBonusTasksQuery();

  useEffect(() => {
    if (id_tg != null) void getBonusTasks({ id_tg, page: 1 });
  }, []);

  const targetRef = useIntersectionObserver<HTMLLIElement, BonusTask>({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
    enabled: tasks.length < total,
    items: tasks,
    total: total,
    handleGetItems: ({ id_tg, page }) => {
      if (id_tg != null) void getBonusTasks({ id_tg, page });
    },
    setPage: setPage,
  });

  if (tasks.length === 0) {
    return <h2 className="text-white-heading text-center mt-[100px]">{t("bonus.noTasks")} </h2>;
  }

  return (
    <ul className="flex flex-col gap-y-3">
      {tasks?.map((task: BonusTask, index, arr) => {
        const { id, title, reward, url, imageUrl, reward_issued, status } = task;

        const isLast = index === arr.length - 1;

        return (
          <li key={id} ref={isLast ? targetRef : null}>
            <BenefitCard
              id={id}
              status={status}
              title={title}
              reward={reward}
              url={url}
              imageUrl={imageUrl}
              reward_issued={reward_issued}
            />
          </li>
        );
      })}
    </ul>
  );
};
