import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  useSignal,
} from "@telegram-apps/sdk-react";
import { MobileNavBar } from "@/widgets";
import { TonBalance, PassiveIncome, LevelUpgrade } from "@/entities";
import { SpinningFan, getReferrals, setStatusCookie } from "@/features";
import { Page } from "@/shared/ui";
import { useEffect } from "react";
import { useAppDispatch } from "@/shared/hooks";
import { HomeHeader } from "@/widgets";
import { useSendAuthMutation, useLazyGetLevelsQuery, AuthData } from "@/shared/api/api.ts";

export const HomePage = () => {
  const initDataRaw = useSignal(_initDataRaw);
  const initDataState = useSignal(_initDataState);
  const dispatch = useAppDispatch();
  const [sendAuth] = useSendAuthMutation();
  const [getLevels] = useLazyGetLevelsQuery();

  useEffect((): void => {
    if (!initDataState || !initDataRaw) return;
    const { first_name, id } = initDataState?.user ?? {};

    if (!first_name || !id) return;

    const id_tg: string = id.toString();

    sendAuth({ initDataRaw })
      .unwrap()
      .then((data: AuthData) => {
        const status = data.user?.status;
        setStatusCookie(status);
      })
      .catch((error) => console.error(error));

    getLevels(id_tg)
      .unwrap()
      .catch((error) => console.error(error));

    void dispatch(getReferrals(id_tg));
  }, [initDataRaw, initDataState]);

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
