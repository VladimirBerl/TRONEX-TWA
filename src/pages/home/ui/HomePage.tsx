import { MobileNavBar } from "@/widgets";
import { TonBalance, PassiveIncome, LevelUpgrade } from "@/entities";
import { SpinningFan } from "@/features";
import { Page } from "@/shared/ui";
import { HomeHeader } from "@/widgets";

export const HomePage = () => {
  return (
    <Page back={false} className="grid grid-rows-[auto_auto_auto_1fr_auto_auto] h-screen relative">
      <HomeHeader />
      <TonBalance />

      <div className="flex flex-col items-center">
        <SpinningFan />
        <PassiveIncome />
      </div>

      <LevelUpgrade />

      <div className="sticky bottom-0">
        <MobileNavBar page="/" />
      </div>
    </Page>
  );
};
