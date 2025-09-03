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
import { AuthData } from "@/shared/types/user.ts";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/shared/config/navigation.ts";
import { isApiError } from "@/shared/lib";

export const HomePage = () => {
  const initDataRaw = useSignal(_initDataRaw);
  // const initDataRaw =
  //   "query_id=AAEZ0GYpAAAAABnQZikOdIiu&user=%7B%22id%22%3A694603801%2C%22first_name%22%3A%22Berlin%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22Deadlife1912%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FXIB8q_IQ9UeqJdisXiVUMe6aGepyrrERplMHSyO68DM.svg%22%7D&auth_date=1756825032&signature=lntIRCA0qHKu6VfWf8pB1A6Jr082mycLt06BpAkBPbwbQi2EPlVGMJYVx8IrI4dxTuBS75zF_OsOyBzk6QO8DA&hash=90bf5c0a6e77ccd05acb5529769f7d25b6289db45eec5670b783960c54a01752";
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
