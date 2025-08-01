import { Dna } from "lucide-react";
import { Button } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const UpgradeControl = () => {
  const { t } = useTranslation()

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center pr-2.5">
        <div className="border-[#47bfe8] border-solid rounded-[12px] border-[2px] mr-1.5 p-1.5">
          <Dna className="rotate-135 w-[38px] h-[38px] stroke-[#47bfe8]"/>
        </div>

        <h2 className="text-link-strong-up">{ t("upgrade.level_1") }</h2>
      </div>

      <Button variant="upgrade">
        { t("upgrade.upgrade") }
      </Button>
    </div>
  );
};
