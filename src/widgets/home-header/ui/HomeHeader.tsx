import { useEffect } from "react";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import axios from "axios";
import { useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { Address } from "ton";
import { LanguageSelector } from "@/features";

export const HomeHeader = () => {
  const [tonConnectUI] = useTonConnectUI();
  const { id_tg, username } = useAppSelector((state: RootState) => state.user);

  const updateWalletOnServer = async (walletAddress: string | null): Promise<void> => {
    const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

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
    <div className="flex justify-between items-center w-full mb-3">
      <p className="text-label">{username ?? ""}</p>

      <TonConnectButton style={{ width: "100%", display: "flex", justifyContent: "center" }} />

      <LanguageSelector />
    </div>
  );
};
