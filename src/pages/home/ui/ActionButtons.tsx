import { Button } from "@/shared/ui";

export const ActionButtons = () => {
  return (
    <div className="flex justify-center flex-wrap gap-[15px] mt-[58px]">
      <Button className="px-3.5">Deposit</Button>
      <Button className="px-3.5">Withdraw</Button>
      <Button className="px-3.5">Invite</Button>
      <Button className="px-3.5">Bonus</Button>
    </div>
  );
};
