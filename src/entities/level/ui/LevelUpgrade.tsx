import { Button } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/shared/model/navigation.ts";
import { useTranslation } from "react-i18next";
import { RootState } from "@/app/store/store.ts";
import { useAppSelector } from "@/shared/hooks/useAppDispatch.ts";

export const LevelUpgrade = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { level } = useAppSelector((state: RootState) => state.user);

  return (
    <div className="w-full flex justify-between items-center mb-2">
      <h2 className="text-link-strong-up">
        {t("home.level")} {level}
      </h2>

      <Button
        onClick={() => {
          void navigate(PATHS.UPGRADE);
        }}
        variant="action"
        size="medium"
      >
        {t("home.upgrade")}
      </Button>
    </div>
  );
};
