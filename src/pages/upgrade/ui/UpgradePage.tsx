import { Button, Page } from '@/shared/ui';
import { Dna } from "lucide-react";

export const UpgradePage = () => {
  return (
    <Page className="flex flex-col items-center gap-y-6">
      <h1 className="text-5xl text-[#5c8afa] uppercase font-semibold text-center">Upgrade</h1>

      <div className="flex justify-between items-center w-full">
        <div className="flex items-center pr-2.5">
          <div className="p-3 border-[#47bfe8] border-solid rounded-[12px] border-[2px] mr-2.5">
            <Dna className="rotate-135 w-[58px] h-[58px] stroke-[#47bfe8]"/>
          </div>
          <h2 className="text-[24px] text-[#18A7FB] uppercase font-semibold xs:text-[18px]">Level 1</h2>
        </div>

        <Button
          className="uppercase font-semibold border-solid border-[#47bfe8] border-[1px] tracking-[2px]">Upgrade</Button>
      </div>

      <section className="w-full">
        <div className="w-full mb-2">
          <div className="flex justify-between w-full">
            <h2 className="uppercase pl-10 text-[#535A64] font-semibold">Upgrade cost</h2>
            <h2 className="uppercase text-[#535A64] font-semibold pr-3">Income</h2>
          </div>

          <div
            className="flex justify-between w-full border-[2px] border-solid border-[#2D2F33] rounded-[12px] py-1 px-2.5 mt-2">
            <div className="flex gap-7.5">
              <span className="text-[#47bfe8] font-semibold text-[18px]">2</span>
              <span className="text-[18px] font-semibold">10 TON</span>
            </div>

            <span className="text-[#47bfe8] font-semibold text-[18px]">0,20 TON/h</span>
          </div>
        </div>
      </section>

    </Page>
  );
};
