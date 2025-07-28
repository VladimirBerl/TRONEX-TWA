// import {
//   initDataRaw as _initDataRaw,
//   initDataState as _initDataState,
//   useSignal,
// } from '@telegram-apps/sdk-react';
import { ActionButtons } from "@/widgets/action-buttons/index.ts";
import { TonBalance } from "@/entities/ton-balance/index.ts";
import { SpinningFan } from "@/features/farm-currency";
import { PassiveIncome } from "@/entities/passive-income/index.ts";
import { LevelUpgrade } from "@/entities/level/index.ts";
import { Page } from '@/shared/ui';

export const HomePage = () => {
  // const initDataRaw = useSignal(_initDataRaw);
  // const initDataState = useSignal(_initDataState);

  return (
    <Page back={ false } className="flex flex-col items-center gap-y-6">
      <TonBalance/>
      <SpinningFan/>
      <PassiveIncome/>

      <LevelUpgrade/>
      <ActionButtons/>
    </Page>
  );
};
