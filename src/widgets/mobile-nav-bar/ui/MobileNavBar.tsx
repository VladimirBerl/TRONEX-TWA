import { Button } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/shared/model/navigation.ts";
import { useTranslation } from "react-i18next";
import { Gift, Wallet, UsersRound, LoaderPinwheel } from "lucide-react";

interface MobileToolbarProps {
  page: string;
}

export const MobileNavBar = ({ page }: MobileToolbarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navItems = [
    { label: t("home.deposit"), path: PATHS.DEPOSIT, Icon: Wallet },
    { label: "Главная", path: PATHS.HOME, Icon: LoaderPinwheel },
    { label: t("home.invite"), path: PATHS.INVITE, Icon: UsersRound },
    { label: t("home.bonus"), path: PATHS.BONUS, Icon: Gift },
  ];
  return (
    <footer className="flex justify-between items-center h-[65px] bg-[#1B1D297F] rounded-t-[16px] border-[1px] border-solid border-[#18a7fb] px-2 pt-0.5 pb-2">
      {navItems.map((item) => {
        const isActive = page === item.path.toLowerCase();
        const Icon = item.Icon;

        return (
          <Button
            key={item.path}
            className="bg-transparent hover:bg-transparent p-0"
            onClick={() => void navigate(item.path)}
          >
            <div className="group flex flex-col items-center justify-center min-w-[60px] px-2 py-1.5 transition-colors duration-100 rounded-t-[12px]">
              <Icon
                size={18}
                className={`transition-colors duration-100 ${isActive ? "text-[#18a7fb]" : "group-hover:text-[#18a7fb] group-active:text-[#18a7fb]"} `}
              />

              <span
                className={` text-[14px] transition-colors duration-100 select-none
                            ${isActive ? "text-[#18a7fb]" : "group-hover:text-[#18a7fb] group-active:text-[#18a7fb]"}
                `}
              >
                {item.label}
              </span>
            </div>
          </Button>
        );
      })}
    </footer>
  );
};
