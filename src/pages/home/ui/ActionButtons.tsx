import { Button } from '@/shared/ui';
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/shared/model/navigation.ts";

export const ActionButtons = () => {
  const navigate = useNavigate()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background p-4 flex items-center justify-between gap-1.5">
      <Button onClick={ () => navigate(PATHS.DEPOSIT) } className="grow">Deposit</Button>
      <Button onClick={ () => navigate(PATHS.WITHDRAW) } className="grow">Withdraw</Button>
      <Button onClick={ () => navigate(PATHS.INVITE) } className="grow">Invite</Button>
      <Button onClick={ () => navigate(PATHS.BONUS) } className="grow">Bonus</Button>
    </div>
  );
};
