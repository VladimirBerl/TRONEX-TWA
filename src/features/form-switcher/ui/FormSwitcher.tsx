import { useTranslation } from "react-i18next";
import { Button } from "@/shared/ui";

interface FormSwitcherProps {
  selectForm: string;
  setSelectForm: (form: string) => void;
}

export const FormSwitcher = ({ selectForm, setSelectForm }: FormSwitcherProps) => {
  const { t } = useTranslation();

  return (
    <section className="flex w-full justify-around bg-[#1b1d29] p-1 mb-[26px] rounded-[12px]">
      <Button
        onClick={() => setSelectForm("deposit")}
        className={`${selectForm === "deposit" ? "bg-[#18a7fb] hover:bg-[#18a7fb]" : "bg-transparent"} rounder-[6px] min-w-[140px] text-balance`}
      >
        {t("deposit.deposit_button")}
      </Button>

      <Button
        onClick={() => setSelectForm("withdraw")}
        className={`${selectForm === "withdraw" ? "bg-[#18a7fb] hover:bg-[#18a7fb]" : "bg-transparent"} rounder-[6px] min-w-[140px] text-balance`}
      >
        {t("withdraw.withdraw_button")}
      </Button>
    </section>
  );
};
