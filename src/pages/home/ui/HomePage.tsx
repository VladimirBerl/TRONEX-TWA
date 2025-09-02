import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  useSignal,
} from "@telegram-apps/sdk-react";
import { MobileNavBar } from "@/widgets";
import { TonBalance, PassiveIncome, LevelUpgrade } from "@/entities";
import { SpinningFan } from "@/features";
import { Page } from "@/shared/ui";
import { useEffect } from "react";
import { HomeHeader } from "@/widgets";
import {
  useSendAuthMutation,
  useLazyGetLevelsQuery,
  useLazyGetReferralsQuery,
} from "@/shared/api/api.ts";
import { AuthData } from "@/shared/types";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/shared/config/navigation.ts";
import { isApiError } from "@/shared/lib";

export const HomePage = () => {
  const initDataRaw = useSignal(_initDataRaw);
  const initDataState = useSignal(_initDataState);
  const navigate = useNavigate();

  const [sendAuth] = useSendAuthMutation();
  const [getLevels] = useLazyGetLevelsQuery();
  const [getReferrals] = useLazyGetReferralsQuery();

  const handleAuth = async (initDataRaw: string) => {
    const data: AuthData = await sendAuth(initDataRaw).unwrap();
    if (data.token) {
      localStorage.setItem("token", data.token);
      return data.token;
    }

    if (data.user?.status === "banned") {
      void navigate(PATHS.BANNED);
      return null;
    }
  };

  useEffect((): void => {
    if (!initDataState || !initDataRaw) return;
    const { first_name, id } = initDataState?.user ?? {};

    if (!first_name || !id) return;

    const id_tg: string = id.toString();

    const run = async () => {
      try {
        const token = await handleAuth(initDataRaw);

        if (!token) return;

        await getLevels(id_tg).unwrap();
        await getReferrals(id_tg).unwrap();
      } catch (error: unknown) {
        if (isApiError(error) && error.status === 401) {
          await handleAuth(initDataRaw);
        }
        console.error(error);
      }
    };

    void run();
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
