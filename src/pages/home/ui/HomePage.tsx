import { Button } from '@/shared/ui';
import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  useSignal,
} from '@telegram-apps/sdk-react';

export const HomePage = () => {
  const initDataRaw = useSignal(_initDataRaw);
  const initDataState = useSignal(_initDataState);

  return (
    <>
      <div className="flex items-center flex-col w-full">
        <section className="mb-[26px]">
          <h1 className="uppercase text-[#535A64] text-lg font-medium">Ton balance</h1>
          <p className="text-center text-[#FFFFFF] text-[28px] block leading-none">0.000000</p>
        </section>

        <div className="relative w-[263px] h-[263px] border-[6px] border-solid border-[#18A7FB] rounded-full">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
             flex items-center justify-center border-[8px] border-solid border-[#262c3a]
             rounded-full w-[150px] h-[150px]">
            <img
              className="w-[100px] h-[100px] object-cover animate-spin"
              src="../../../../public/images/Fan.png"
              alt="Fan-image"
            />
          </div>
        </div>


        <section className="my-[26px]">
          <h2 className="uppercase text-[#535A64] font-medium text-center">Passive income</h2>

          <div className="flex gap-2.5 items-center">
            <p className="text-[#18A7FB] text-[28px] block leading-none">0.000000</p>
            <p className="text-[#18A7FB] text-[18px] block leading-none">TON/hr</p>
          </div>
        </section>
      </div>

      <div className="flex justify-between items-center mx-[30px]">
        <h2 className="uppercase text-[#FFFFFF] font-medium">Level 1</h2>
        <Button className="btn-main px-5 text-[#18A7FB] bg-[#1B1D29]">Upgrade</Button>
      </div>

      <div className="flex justify-center flex-wrap gap-[15px] mt-[58px]">
        {/*TODO Повторы стилей, поскольку хз как настроить конфиг*/ }
        <Button className="btn-main px-3.5 text-[#18A7FB] bg-[#1B1D29]">Deposit</Button>
        <Button className="btn-main px-3.5 text-[#18A7FB] bg-[#1B1D29]">Withdraw</Button>
        <Button className="btn-main px-3.5 text-[#18A7FB] bg-[#1B1D29]">Invite</Button>
        <Button className="btn-main px-3.5 text-[#18A7FB] bg-[#1B1D29]">Bonus</Button>
      </div>
    </>
  )
};
