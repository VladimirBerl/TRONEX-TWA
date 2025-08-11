import { Page } from "@/shared/ui";
import { BenefitCard } from "@/features";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { Task } from "@/features/bonus/model/tasksSlice.ts";

export const BonusPage = () => {
  const { t } = useTranslation();
  const { tasks } = useSelector((state: RootState) => state.tasks);

  return (
    <Page className="grid grid-rows-[auto_auto] gap-y-6">
      <h1 className="text-title leading-none text-center mb-[20px]">{t("bonus.title")}</h1>

      <section className="w-full">
        <h2 className="text-heading mb-2">{t("bonus.opportunities")}</h2>

        {tasks?.map((task: Task) => {
          const { id, title, reward, url, imageUrl, reward_issued, status } = task;
          return (
            <div key={id}>
              <BenefitCard
                id={id}
                status={status}
                title={title}
                reward={reward}
                url={url}
                imageUrl={imageUrl}
                reward_issued={reward_issued}
              />
            </div>
          );
        })}
      </section>
    </Page>
  );
};
