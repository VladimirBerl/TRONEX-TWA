import { Button } from "@/shared/ui";

export const LevelUpgrade = () => {
  return (
    <div className="flex justify-between items-center mx-[30px]">
      <h2 className="uppercase text-[#FFFFFF] font-medium">Level 1</h2>
      <Button className="px-5">
        Upgrade
      </Button>
    </div>
  );
}
