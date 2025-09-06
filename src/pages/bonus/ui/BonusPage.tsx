import { Page } from "@/shared/ui";
import { BenefitCard } from "@/features";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { useIntersectionObserver } from "@/shared/hooks/useIntersectionObserver.ts";
import { MobileNavBar } from "@/widgets";
import { useLazyGetBonusTasksQuery } from "@/shared/api/api.ts";
import { BonusTask } from "@/shared/types/tasks.ts";

export const BonusPage = () => {
  const { t } = useTranslation();
  const { tasks, total } = useSelector((state: RootState) => state.tasks);
  const { id_tg } = useAppSelector((state: RootState) => state.user);
  const [, setPage] = useState<number>(1);
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

  return (
    <Page className="grid grid-rows-[auto_1fr] gap-y-6 h-screen relative">
      <h1 className="text-title leading-none text-center mb-[20px]">{t("bonus.title")}</h1>

      <section className="w-full">
        <h2 className="text-heading mb-2">{t("bonus.opportunities")}</h2>

        <ul className="flex flex-col gap-y-3">
          {tasks.length === 0 ?
            <h2 className="text-white-heading text-center mt-[100px]">
              В данный момент задачи отсутствуют.
            </h2>
          : tasks?.map((task: BonusTask, index, arr) => {
              const { id, title, reward, url, imageUrl, reward_issued, status } = task;

              const isLast: boolean = index === arr.length - 1;

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
      </section>

      <div className="sticky bottom-0 w-full">
        <MobileNavBar page="/bonus" />
      </div>
    </Page>
  );
};
