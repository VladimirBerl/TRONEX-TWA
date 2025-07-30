import { useTranslation } from "react-i18next";

export const HeaderUpgradeTier = () => {
  const { t } = useTranslation()

  return (
    <header className="flex justify-between w-full">
      <h2 className="text-heading pl-3">{ t("upgrade.upgrade_cost") }</h2>
      <h2 className="text-heading pr-3">{ t("upgrade.income") }</h2>
    </header>
  );
};
