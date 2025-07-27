import { Button } from '@/shared/ui';
import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  useSignal,
} from '@telegram-apps/sdk-react';

export const HomePage = () => {
  const initDataRaw = useSignal(_initDataRaw);
  const initDataState = useSignal(_initDataState);

  return <Button className="text-3xl text-amber-700">A:das.fasf</Button>;
};
