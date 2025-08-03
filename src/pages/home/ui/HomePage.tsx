import {
  // initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  useSignal,
} from '@telegram-apps/sdk-react';
import { ActionButtons } from "@/widgets";
import { TonBalance, PassiveIncome, LevelUpgrade } from "@/entities";
import { SpinningFan, LanguageSelector } from "@/features";
import { Page } from '@/shared/ui';
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setIdTg } from "@/features/auth/model/slice/userSlice.ts";

export const HomePage = () => {
  // const initDataRaw = useSignal(_initDataRaw);
  /**
   * initDataRaw - Сырые инициализацио́нные данные в виде строки
   * Используется, для валидации подлинности пользователя на сервере.
   */
  const initDataState = useSignal(_initDataState); // Объект с пользователем
  const dispatch = useDispatch();
  const [ balance, setBalance ] = useState<number | string>("0.000000");
  const [ clickLimit, setClickLimit ] = useState<number | null>(null);

  const API_URL: string = import.meta.env.VITE_API_BASE_URL;

  const sendAuth = async (first_name: string, id: string): Promise<void> => {
    try {
      const response = await axios.post(`${ API_URL }/api/auth`, {
        username: first_name,
        id_tg: id,
      });

      const { farm_balance, clicks_today } = response.data;
      setBalance(parseFloat(farm_balance).toFixed(6));
      setClickLimit(clicks_today);
      dispatch(setIdTg(id));

    } catch (error) {
      console.error(error);
    }
  }

  useEffect((): void => {
    const { first_name, id } = initDataState?.user ?? {};

    if (!first_name || !id) return;

    void sendAuth(first_name, id.toString());
  }, []);

  return (
    <Page back={ false } className="flex flex-col items-center gap-y-6">
      <LanguageSelector/>

      <TonBalance balance={ balance }/>
      <SpinningFan setBalance={ setBalance } clickLimit={ clickLimit } setClickLimit={ setClickLimit }/>
      <PassiveIncome/>

      <LevelUpgrade/>
      <ActionButtons/>
    </Page>
  );
};
