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
    <div className="w-full mb-3">
      <TonConnectButton
        style={{
          width: "100%",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      />
    </div>
  );
};
