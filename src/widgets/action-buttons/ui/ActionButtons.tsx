import { Button } from '@/shared/ui';
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/shared/model/navigation.ts";
import { useTranslation } from "react-i18next";

export const ActionButtons = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()


  return (
    <div className="mobile-toolbar">
      <Button onClick={ () => { void navigate(PATHS.DEPOSIT) }} variant="action">
        { t("home.deposit") }
      </Button>

      <Button onClick={ () => { void navigate(PATHS.WITHDRAW) }} variant="action">
        { t("home.withdraw") }
      </Button>

      <Button onClick={ () => { void navigate(PATHS.INVITE) }} variant="action">
        { t("home.invite") }
      </Button>

      <Button onClick={ () => { void navigate(PATHS.BONUS) }} variant="action">
        { t("home.bonus") }
      </Button>
    </div>

  );
};
