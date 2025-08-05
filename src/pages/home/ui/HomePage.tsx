import {
  // initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  useSignal,
} from "@telegram-apps/sdk-react";
import { ActionButtons } from "@/widgets";
import { TonBalance, PassiveIncome, LevelUpgrade } from "@/entities";
import { SpinningFan, LanguageSelector } from "@/features";
import { Page } from "@/shared/ui";
import { useEffect } from "react";
import { sendAuth } from "@/features/auth/model/authThunk.ts";
import { useAppDispatch } from "@/shared/hooks/useAppDispatch.ts";
import { getLevels } from "@/features/levels/model/levelsThunk.ts";

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

    void dispatch(sendAuth({ first_name, id_tg: id.toString() }));
    void dispatch(getLevels());
  }, []);

  return (
    <Page back={false} className="flex flex-col items-center gap-y-2">
      <LanguageSelector />

      <TonBalance />
      <SpinningFan />
      <PassiveIncome />

      <LevelUpgrade />
      <ActionButtons />
    </Page>
  );
};
