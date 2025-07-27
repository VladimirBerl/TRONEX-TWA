import { Button } from '@/shared/ui';

export const ActionButtons = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background p-4 flex items-center justify-between gap-1.5">
      <Button className="grow">Deposit</Button>
      <Button className="grow">Withdraw</Button>
      <Button className="grow">Invite</Button>
      <Button className="grow">Bonus</Button>
    </div>
  );
};
