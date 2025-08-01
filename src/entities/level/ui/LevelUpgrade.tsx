import { Button } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/shared/model/navigation.ts";
import { useTranslation } from "react-i18next";

export const LevelUpgrade = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="w-full flex justify-between items-center mx-[30px]">
      <h2 className="text-label">{t("home.level_1")}</h2>

      <Button onClick={() => navigate(PATHS.UPGRADE)} className="btn-main px-5 text-button-small bg-[#1B1D29]">
        {t("home.upgrade")}
      </Button>
    </div>
  );
}
