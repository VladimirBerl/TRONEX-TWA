import { Input } from "@/shared/ui";
import { ChevronsDownUp } from "lucide-react";

export const DepositForm = () => {
  return (
    <form className="mb-6 w-full">
      <h2 className="text-white-heading mb-2">Your deposite:</h2>

      <div className="relative">
        <Input
          className="bg-[#1b1b27] h-[50px] pr-[95px] pl-[16px] py-[12px]
        text-input-large border border-[#2c2c3b] rounded-lg
        focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20
        transition-all duration-200
        placeholder:text-input-large"
          placeholder="0"
        />

        <div className="absolute top-[8px] right-[10px] flex items-center gap-0.5">
          <ChevronsDownUp className="stroke-[#18A7FB] w-[14px] h-[14px]" />
          <p className="text-subtitle">USDT</p>
        </div>
      </div>

      <p className="text-body pt-1">
        Payment services may charge an additional fee for top-ups.
      </p>
    </form>

  );
};
