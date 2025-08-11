import {
  // initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  useSignal,
} from "@telegram-apps/sdk-react";
import { ActionButtons } from "@/widgets";
import { TonBalance, PassiveIncome, LevelUpgrade } from "@/entities";
import {
  SpinningFan,
  LanguageSelector,
  getLevels,
  getTasks,
  sendAuth,
  TonConnection,
} from "@/features";
import { Page } from "@/shared/ui";
import { useEffect } from "react";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts";

export const HomePage = () => {
  // const initDataRaw = useSignal(_initDataRaw);
  /**
   * initDataRaw - Сырые инициализацио́нные данные в виде строки
   * Используется, для валидации подлинности пользователя на сервере.
   */
  const initDataState = useSignal(_initDataState); // Объект с пользователем
  const dispatch = useAppDispatch();

  useEffect((): void => {
    const { first_name, id } = initDataState?.user ?? {};

    if (!first_name || !id) return;

    const id_tg: string = id.toString();

    void dispatch(sendAuth({ first_name, id_tg }));
    void dispatch(getLevels({ id_tg }));
    void dispatch(getTasks(id_tg));
  }, []);

  return (
    <Page back={false} className="grid grid-rows-[auto_auto_auto_1fr_auto_auto] h-screen">
      <LanguageSelector />
      <TonConnection />
      <TonBalance />

      <div className="flex flex-col items-center">
        <SpinningFan />
        <PassiveIncome />
      </div>

      <LevelUpgrade />

      <div className="h-full w-full pb-4">
        <ActionButtons />
      </div>
    </Page>
  );
};
