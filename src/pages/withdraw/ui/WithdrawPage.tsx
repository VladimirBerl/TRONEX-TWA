import { Button, Input, Page } from "@/shared/ui";
import { ChevronsDownUp } from "lucide-react";
import { ReactComponent as Ton } from "@/shared/assets/icons/Ton.svg";

export const WithdrawPage = () => {
  return (
    <Page back={ false } className="flex flex-col items-center gap-y-6">
      <h1 className="text-5xl text-[#5c8afa] uppercase font-semibold text-center">Withdraw</h1>

      <div className="w-full">
        <section className="mb-6">
          <h2 className="uppercase text-[18px] font-semibold mb-2">You withdraw:</h2>

          <div className="relative">
            <Input
              className="bg-[#1b1b27] h-[50px] pr-[95px] pl-[16px] py-[12px]
                border border-[#2c2c3b] rounded-lg
                focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20
                transition-all duration-200
                placeholder:text-[24px] placeholder:font-semibold text-[24px]"
                placeholder="0"
            />

            <div className="absolute top-[8px] right-[10px] flex items-center gap-0.5">
              <ChevronsDownUp className="stroke-[#18A7FB] w-[14px] h-[14px]"/>
              <p className="text-[#18A7FB] font-semibold text-[24px]">USDT</p>
            </div>
          </div>
          <p className="text-[#535A64] text-[14px] pt-1">Fee: 3% (Min. 1 USDT)</p>
        </section>

        <section className="mb-6">
          <h2 className="font-semibold mb-1">Wallet Address</h2>
          <Input
            className="bg-[#1b1b27] pr-[80px] border border-[#2c2c3b] rounded-lg
            focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20
            transition-all duration-200"
            placeholder="0xc304sjfujewhiuh3ih2"
          />
        </section>

        <section>
          <h2 className="font-semibold mb-1">Network</h2>
          <Input
            className="bg-[#1b1b27] pr-[80px] border border-[#2c2c3b] rounded-lg
              focus:outline-none focus:border-[#5d8cf0]/40 focus:ring-1 focus:ring-[#5d8cf0]/20
              transition-all duration-200
              placeholder:font-semibold placeholder:text-[14px]"
            placeholder="BSC (BEP-20)"
          />
        </section>

        <p className="text-[#535A64] font-semibold pt-3">Make sure you have entered the required information
          correctly.</p>
      </div>

      <div className="fixed bottom-0 left-0 w-full px-4 pb-4">
        <div className="w-full flex flex-col justify-end">
          <div className="flex justify-start gap-5 mb-5">
            <div className="w-[50px] h-[50px] rounded-full bg-[#18A7FB] flex items-center justify-center">
              <Ton />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-[#535A64] font-semibold text-[12px]">Payment Method</h3>
              <p className="font-semibold">Crypto Wallet</p>
            </div>
          </div>

          <Button className="uppercase text-[18px] font-semibold px-3.5">Withdraw 0 USDT</Button>
        </div>
      </div>
    </Page>
  );
};


