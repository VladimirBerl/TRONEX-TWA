import { Button } from "@/shared/ui";

export const ActionButtons = () => {
  return (
    <div className="flex justify-center flex-wrap gap-[15px] mt-[58px]">
      {/*TODO Повторы стилей, поскольку хз как настроить конфиг*/ }
      <Button className="btn-main px-3.5 text-[#18A7FB] bg-[#1B1D29]">Deposit</Button>
      <Button className="btn-main px-3.5 text-[#18A7FB] bg-[#1B1D29]">Withdraw</Button>
      <Button className="btn-main px-3.5 text-[#18A7FB] bg-[#1B1D29]">Invite</Button>
      <Button className="btn-main px-3.5 text-[#18A7FB] bg-[#1B1D29]">Bonus</Button>
    </div>
  );
};
