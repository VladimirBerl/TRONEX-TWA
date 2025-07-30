import { Button } from '@/shared/ui';
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/shared/model/navigation.ts";

export const ActionButtons = () => {
  const navigate = useNavigate()

  return (
    <div className="mobile-toolbar">
      <Button onClick={ () => navigate(PATHS.DEPOSIT) } className="text-button-small grow p-2">Deposit</Button>
      <Button onClick={ () => navigate(PATHS.WITHDRAW) } className="text-button-small grow p-2">Withdraw</Button>
      <Button onClick={ () => navigate(PATHS.INVITE) } className="text-button-small grow p-2">Invite</Button>
      <Button onClick={ () => navigate(PATHS.BONUS) } className="text-button-small grow p-2">Bonus</Button>
    </div>
  );
};
