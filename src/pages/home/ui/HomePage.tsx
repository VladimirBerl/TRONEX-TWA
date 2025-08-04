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
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setIdTg,
  setFarmBalance,
  setClicksToday,
  setLevel,
  setInvestmentBalance,
} from "@/features/auth/model/slice/userSlice.ts";
import { setLevels } from "@/features/levels/model/slice/levelsSlice.ts";
import { Level } from "@/shared/api/upgrade/types.ts";

interface AuthResponse {
  farm_balance: number | string;
  clicks_today: number;
  level: number;
  investment_balance: number | string;
}

export const HomePage = () => {
  // const initDataRaw = useSignal(_initDataRaw);
  /**
   * initDataRaw - Сырые инициализацио́нные данные в виде строки
   * Используется, для валидации подлинности пользователя на сервере.
   */
  const initDataState = useSignal(_initDataState); // Объект с пользователем
  const dispatch = useDispatch();

  const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

  const sendAuth = async (first_name: string, id: string): Promise<void> => {
    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/api/auth`, {
        username: first_name,
        id_tg: id,
      });
      const { farm_balance, clicks_today, level, investment_balance } = response.data;

      const round6 = (num: number | string): number => parseFloat(Number(num).toFixed(6));

      dispatch(setIdTg(id));
      dispatch(setFarmBalance(round6(farm_balance)));
      dispatch(setClicksToday(clicks_today));
      dispatch(setLevel(level));
      dispatch(setInvestmentBalance(round6(investment_balance)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetLevels = async (): Promise<void> => {
    try {
      const response = await axios.get<Level[]>(`${API_URL}/api/levels`);
      dispatch(setLevels(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect((): void => {
    const { first_name, id } = initDataState?.user ?? {};

    if (!first_name || !id) return;

    void sendAuth(first_name, id.toString());
    void handleGetLevels();
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
