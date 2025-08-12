import { useEffect } from "react";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import axios from "axios";
import { useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { Address } from "ton";

export const TonConnection = () => {
  const [tonConnectUI] = useTonConnectUI();
  const { id_tg } = useAppSelector((state: RootState) => state.user);

  const updateWalletOnServer = async (walletAddress: string | null): Promise<void> => {
    const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;
    // console.log(walletAddress); // 0:8045476576b88910b292411238ce468026d4208bbb43f00f5f2be1b04f9bc048

    // "0QCARUdldriJELKSQRI4zkaAJtQgi7tD8A9fK-GwT5vASPkt" - что я должен был получить
    // "EQCARUdldriJELKSQRI4zkaAJtQgi7tD8A9fK-GwT5vASB9i" - что получил

    try {
      await axios.patch(`${API_URL}/api/users/${id_tg}/wallet-address`, {
        wallet_address: walletAddress,
      });
    } catch (error: unknown) {
      console.error(error instanceof Error ? error.message : error);
    }
  };

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((wallet): void => {
      try {
        if (wallet) {
          let friendlyAddress;
          try {
            friendlyAddress = Address.parse(wallet.account.address).toString({ bounceable: true });
          } catch {
            friendlyAddress = wallet.account.address;
          }
          void updateWalletOnServer(friendlyAddress);
        } else {
          void updateWalletOnServer(null);
        }
      } catch (error: unknown) {
        if (error instanceof Error && error.message?.includes("Operation aborted")) {
          console.log("TON Connect операция прервана, это не критично");
        } else {
          console.error(error);
        }
      }
    });
    return () => unsubscribe();
  }, [tonConnectUI]);

  return (
    <div className="w-full mb-3">
      <TonConnectButton
        style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center" }}
      />
    </div>
  );
};
