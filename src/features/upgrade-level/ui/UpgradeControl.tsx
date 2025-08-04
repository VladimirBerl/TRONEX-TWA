import { Dna } from "lucide-react";
import { Button, FormItem } from "@/shared/ui";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";

interface UpgradeControlProps {
  handleUpgradeLevel: () => void;
  isBalanceInsufficient: boolean;
}

export const UpgradeControl = ({ handleUpgradeLevel, isBalanceInsufficient }: UpgradeControlProps) => {
  const { t } = useTranslation()
  const { level } = useSelector((state: RootState) => state.user);

  return (
    <div className="flex justify-between items-center w-full relative">
      <div className="flex items-center pr-2.5">
        <div className="border-[#47bfe8] border-solid rounded-[12px] border-[2px] mr-1.5 p-1.5">
          <Dna className="rotate-135 w-[38px] h-[38px] stroke-[#47bfe8]"/>
        </div>

        <h2 className="text-link-strong-up">{ t("upgrade.level") } { level }</h2>
      </div>

      <FormItem>
        <Button
          variant="upgrade"
          onClick={ handleUpgradeLevel }
          disabled={ isBalanceInsufficient }
        >
          { t("upgrade.upgrade") }
        </Button>
      </FormItem>

      { isBalanceInsufficient && (
        <span className="text-error absolute right-0 bottom-[-10px]">Недостаточно средств</span>
      ) }
    </div>
  );
};
