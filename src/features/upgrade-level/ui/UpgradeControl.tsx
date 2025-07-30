import { Dna } from "lucide-react";
import { Button } from "@/shared/ui";
import { useTranslation } from "react-i18next";

export const UpgradeControl = () => {
  const { t } = useTranslation()

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center pr-2.5">
        <div className="p-3 border-[#47bfe8] border-solid rounded-[12px] border-[2px] mr-2.5">
          <Dna className="rotate-135 w-[58px] h-[58px] stroke-[#47bfe8]" />
        </div>
        <h2 className="text-link-strong-up sm:text-[24px]">{t("upgrade.level_1")}</h2>
      </div>

      <Button
        className="text-button-small border-solid border-[#47bfe8] border-[1px] tracking-[2px]"
      >
        {t("upgrade.upgrade")}
      </Button>
    </div>
  );
};
