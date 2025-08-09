import { useEffect } from "react";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";

export const TonConnection = () => {
  const address: string = useTonAddress();

  useEffect((): void => {
    if (address) {
      console.log("Connected wallet address:", address);
    }
  }, [address]);

  return (
    <div className="absolute left-[80px]">
      <TonConnectButton />
    </div>
  );
};
