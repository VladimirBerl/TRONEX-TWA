import { Button } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/shared/model/navigation.ts";
import { useTranslation } from "react-i18next";
import { LevelContext } from "@/app/provider/level-provider/LevelProvider.tsx";
import { useRequiredContext } from "@/shared/hooks/useRequiredContext.ts";

export const LevelUpgrade = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { level } = useRequiredContext(LevelContext, "LevelContext");

  return (
    <div className="w-full flex justify-between items-center mx-[30px]">
      <h2 className="text-label">{ t("home.level") } { level }</h2>

      <Button onClick={ () => navigate(PATHS.UPGRADE) } variant="action" size="medium">
        { t("home.upgrade") }
      </Button>
    </div>
  );
}
