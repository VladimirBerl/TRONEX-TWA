import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  useSignal,
} from '@telegram-apps/sdk-react';
import { TonBalance, SpinningFan, PassiveIncome, LevelUpgrade, ActionButtons } from "@/pages/home/index.ts";

export const HomePage = () => {
  const initDataRaw = useSignal(_initDataRaw);
  const initDataState = useSignal(_initDataState);

  return (
    <>
      <div className="flex items-center flex-col w-full">
        <TonBalance/>

        <SpinningFan/>

        <PassiveIncome/>
      </div>

      <LevelUpgrade/>

      <ActionButtons/>
    </>
  )
};
