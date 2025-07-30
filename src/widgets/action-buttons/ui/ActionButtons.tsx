import { Button } from '@/shared/ui';
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/shared/model/navigation.ts";
import { useTranslation } from "react-i18next";

export const ActionButtons = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()


  return (
    <div className="mobile-toolbar">
      <Button onClick={ () => navigate(PATHS.DEPOSIT) } className="text-button-small grow p-2">
        { t("home.deposit") }
      </Button>

      <Button onClick={ () => navigate(PATHS.WITHDRAW) } className="text-button-small grow p-2">
        { t("home.withdraw") }
      </Button>

      <Button onClick={ () => navigate(PATHS.INVITE) } className="text-button-small grow p-2">
        { t("home.invite") }
      </Button>

      <Button onClick={ () => navigate(PATHS.BONUS) } className="text-button-small grow p-2">
        { t("home.bonus") }
      </Button>
    </div>

  );
};
