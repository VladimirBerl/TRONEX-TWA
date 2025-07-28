import { Button } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/shared/model/navigation.ts";

export const LevelUpgrade = () => {
  const navigate = useNavigate()

  return (
    <div className="w-full flex justify-between items-center mx-[30px]">
      <h2 className="uppercase text-[#FFFFFF] font-medium">Level 1</h2>
      <Button onClick={ () => navigate(PATHS.UPGRADE) } className="btn-main px-5 text-[#18A7FB] bg-[#1B1D29]">
        Upgrade
      </Button>
    </div>
  );
}
