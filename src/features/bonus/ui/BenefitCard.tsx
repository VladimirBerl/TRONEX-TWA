import { Button } from "@/shared/ui";
import { ReactNode } from "react";

interface BenefitCardProps {
  description: string;
  benefit: string;
  icon: ReactNode;
}

export const BenefitCard = ({ description, benefit, icon }: BenefitCardProps) => {
  return (
    <div className="bg-[#161d27] p-3 h-[100px] rounded-[12px] mb-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-5 items-center">
          <div className="bg-[#2180d4] p-1.5 w-[60px] h-[60px] rounded-[12px]">
            {icon}
          </div>

          <p className="max-w-[100px]">{description}</p>
        </div>

        <Button className="bg-[#1f2533] text-button-strong">Get</Button>
      </div>

      <p className="flex justify-end text-link-strong">{benefit}</p>
    </div>
  );
};