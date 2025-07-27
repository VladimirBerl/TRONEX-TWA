import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  // useSignal,
} from '@telegram-apps/sdk-react';
import { TonBalance, SpinningFan, PassiveIncome, LevelUpgrade, ActionButtons } from '@/pages/home/index.ts';
import { Page } from '@/shared/ui';

export const HomePage = () => {
  // const initDataRaw = useSignal(_initDataRaw);
  // const initDataState = useSignal(_initDataState);

  return (
    <Page back={false} className="flex flex-col items-center gap-y-6">
      <TonBalance />
      <SpinningFan />
      <PassiveIncome />
      <LevelUpgrade />
      <ActionButtons />
    </Page>
  );
};
