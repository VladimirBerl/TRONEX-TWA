import { Button } from "@/shared/ui";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface BenefitCardProps {
  description: string;
  benefit: string;
  icon: ReactNode;
}

export const BenefitCard = ({ description, benefit, icon }: BenefitCardProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-[#161d27] p-3 h-[100px] rounded-[12px] mb-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <div className="bg-[#2180d4] p-1.5 w-[60px] h-[60px] min-w-[60px] rounded-[12px]">
            {icon}
          </div>

          <p className="max-w-[100px] mr-1.5 sm:text-[16px] text-[14px]">{description}</p>
        </div>

        <Button variant="get">{t("bonus.get")}</Button>
      </div>

      <p className="flex justify-end text-link-strong">{benefit}</p>
    </div>
  );
};
