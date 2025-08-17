import { Page } from "@/shared/ui";
import { BenefitCard, getTasks } from "@/features";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { Task } from "@/entities/bonus/model/tasksSlice.ts";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver.ts";

export const BonusPage = () => {
  const { t } = useTranslation();
  const { tasks, total } = useSelector((state: RootState) => state.tasks);
  const { id_tg } = useAppSelector((state: RootState) => state.user);
  const [, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id_tg != null) void dispatch(getTasks({ id_tg }));
  }, []);

  const loadMore = (): void => {
    setPage((prevPage: number): number => {
      const newPage: number = prevPage + 1;
      if (id_tg) void dispatch(getTasks({ id_tg, page: newPage }));
      return newPage;
    });
  };

  const targetRef = useIntersectionObserver<HTMLLIElement>({
    root: null,
    rootMargin: "0px",
    threshold: 0.5,
    enabled: tasks.length < total,

    onIntersect: (): void => {
      loadMore();
    },
  });

  return (
    <Page className="grid grid-rows-[auto_auto] gap-y-6">
      <h1 className="text-title leading-none text-center mb-[20px]">{t("bonus.title")}</h1>

      <ul className="w-full">
        <h2 className="text-heading mb-2">{t("bonus.opportunities")}</h2>

        {tasks.length === 0 ?
          <h2 className="text-white-heading text-center mt-[100px]">
            В данный момент задачи отсутствуют.
          </h2>
        : tasks?.map((task: Task, index) => {
            const { id, title, reward, url, imageUrl, reward_issued, status } = task;

            const isLast: boolean = index === tasks.length - 1;

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
          })
        }
      </ul>
    </Page>
  );
};
