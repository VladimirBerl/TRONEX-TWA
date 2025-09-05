import {
  // initDataRaw as _initDataRaw,
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
  // const initDataRaw = useSignal(_initDataRaw);
  const initDataState = useSignal(_initDataState);
  const navigate = useNavigate();
  const initDataRaw =
    "query_id=AAHTiAM1AAAAANOIAzXff-yb&user=%7B%22id%22%3A889424083%2C%22first_name%22%3A%22Pavel%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22PaHuMbIu%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FLTql11elyHAZbfp37pqXmjxnJL_zMzjbqs1I4R0b2pA.svg%22%7D&auth_date=1757067236&signature=-XgWVCDQ5moypXW-TZdvlBPlwvN623sWKtjIv4yedFuAr8K5ym5ywJu6Q3cr1DxyEvV_nZuuLV0ITIRtFYqiBQ&hash=facbf33cf4925a55bd400b5a31a4bc7393a5a230bfeeb34e7d28fbf29db2d1a9";
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
    <Page back={false} className="grid grid-rows-[auto_auto_auto_1fr_auto_auto] h-screen relative">
      <HomeHeader />
      <TonBalance />

      <div className="flex flex-col items-center">
        <SpinningFan />
        <PassiveIncome />
      </div>

      <LevelUpgrade />

      <div className="sticky bottom-0">
        <MobileNavBar page="/" />
      </div>
    </Page>
  );
};
