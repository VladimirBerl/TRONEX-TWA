import { Button } from '@/shared/ui';
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/shared/model/navigation.ts";

// TODO Положил в Widgets, поскольку это просто каркас перенаправляющих кнопок не влияющих на бизнес логику
export const ActionButtons = () => {
  const navigate = useNavigate()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background p-4 flex items-center justify-between gap-1.5">
      <Button onClick={ () => navigate(PATHS.DEPOSIT) } className="text-button-small grow p-2">Deposit</Button>
      <Button onClick={ () => navigate(PATHS.WITHDRAW) } className="text-button-small grow p-2">Withdraw</Button>
      <Button onClick={ () => navigate(PATHS.INVITE) } className="text-button-small grow p-2">Invite</Button>
      <Button onClick={ () => navigate(PATHS.BONUS) } className="text-button-small grow p-2">Bonus</Button>
    </div>
  );
};
