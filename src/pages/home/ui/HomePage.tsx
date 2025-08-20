import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  useSignal,
} from "@telegram-apps/sdk-react";
import { MobileNavBar } from "@/widgets";
import { TonBalance, PassiveIncome, LevelUpgrade } from "@/entities";
import { SpinningFan, sendAuth, getReferrals, getLevels } from "@/features";
import { Page } from "@/shared/ui";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { BannedPage, SplashScreen } from "@/pages";
import { HomeHeader } from "@/widgets";

export const HomePage = () => {
  const initDataRaw = useSignal(_initDataRaw);
  /**
   * initDataRaw - Сырые инициализацио́нные данные в виде строки
   * Используется, для валидации подлинности пользователя на сервере.
   */
  const initDataState = useSignal(_initDataState); // Объект с пользователем
  const dispatch = useAppDispatch();
  const { status, loading } = useAppSelector((state: RootState) => state.user);

  useEffect((): void => {
    if (!initDataState || !initDataRaw) return;
    const { first_name, id } = initDataState?.user ?? {};

    if (!first_name || !id) return;

    const id_tg: string = id.toString();

    void dispatch(sendAuth({ initDataRaw }));
    void dispatch(getLevels({ id_tg }));
    void dispatch(getReferrals(id_tg));
  }, [initDataRaw, initDataState]);

  if (loading) return <SplashScreen />;
  if (status === "banned") return <BannedPage />;

  return (
    <Page back={false} className="grid grid-rows-[auto_auto_auto_1fr_auto_auto] h-screen">
      <HomeHeader />
      <TonBalance />

      <div className="flex flex-col items-center">
        <SpinningFan />
        <PassiveIncome />
      </div>

      <LevelUpgrade />

      <MobileNavBar page="/" />
    </Page>
  );
};
