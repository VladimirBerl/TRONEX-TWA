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
  getReferrals,
  getWithdrawHistory,
  getDepositHistory,
} from "@/features";
import { Page } from "@/shared/ui";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { BannedPage, SplashScreen } from "@/pages";
import { reset, setPage } from "@/entities/withdraw-history/model/withdrawalsSlice.ts";

export const HomePage = () => {
  // const initDataRaw = useSignal(_initDataRaw);
  /**
   * initDataRaw - Сырые инициализацио́нные данные в виде строки
   * Используется, для валидации подлинности пользователя на сервере.
   */
  const initDataState = useSignal(_initDataState); // Объект с пользователем
  const dispatch = useAppDispatch();
  const { status, loading } = useAppSelector((state: RootState) => state.user);

  useEffect((): void => {
    const { first_name, id } = initDataState?.user ?? {};

    if (!first_name || !id) return;

    const id_tg: string = id.toString();

    void dispatch(sendAuth({ first_name, id_tg }));
    void dispatch(getLevels({ id_tg }));
    void dispatch(getTasks(id_tg));
    void dispatch(getReferrals(id_tg));
    void dispatch(getWithdrawHistory({ id_tg, page: 1 }));
    void dispatch(getDepositHistory(id_tg));
  }, []);

  useEffect(() => {
    dispatch(reset());
    dispatch(setPage(1));
  }, [dispatch]);

  if (loading) return <SplashScreen />;
  if (status === "banned") return <BannedPage />;

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
