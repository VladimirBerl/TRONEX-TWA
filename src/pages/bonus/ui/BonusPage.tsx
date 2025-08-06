import { Page } from "@/shared/ui";
import { BenefitCard } from "@/features";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Tasks } from "@/features/bonus/lib/types.ts";

export const BonusPage = () => {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<Tasks[] | null>(null);

  // const { id_tg } = useSelector((state: RootState) => state.user);

  // const API_URL = import.meta.env.VITE_API_BASE_URL as string;

  const handleGetTasks = (): Tasks[] => {
    try {
      if (import.meta.env.DEV) {
        return [
          {
            id: 9,
            title: "Возможно здесь награда",
            reward: "1.000000000000000000",
            url: "https://google.com",
            imageUrl: "https://api.telegram.org/file/botXYZ/photos/file_12.jpg",
            status: "completed",
            reward_issued: false,
          },
          {
            id: 10,
            title: "ГАв гав мяу мяу",
            reward: "2.500000000000000000",
            url: "https://example.com",
            imageUrl: "https://api.telegram.org/file/botXYZ/photos/file_13.jpg",
            status: "pending",
            reward_issued: false,
          },
        ];
      }

      // const response = await axios.get(`${API_URL}/api/users/${id_tg}/tasks`);
    } catch (error) {
      console.error("Ошибка при получении заданий:", error);
    }

    return [];
  };

  useEffect((): void => {
    const response: Tasks[] = handleGetTasks();
    setTasks(response);
  }, []);

  return (
    <Page className="flex flex-col items-center gap-y-6">
      <h1 className="text-title leading-none text-center mb-[20px]">{t("bonus.title")}</h1>

      <section className="w-full">
        <h2 className="text-heading mb-2">{t("bonus.opportunities")}</h2>

        {tasks?.map((task: Tasks) => {
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
