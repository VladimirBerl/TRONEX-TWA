import { useEffect } from "react";
import { TonConnectButton, useTonConnectUI } from "@tonconnect/ui-react";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/useAppDispatch.ts";
import { RootState } from "@/app/store/store.ts";
import { Address } from "ton";
import { LanguageSelector } from "@/features";
import { setWalletAddress } from "@/entities/user/model/userSlice.ts";
import { AuthData, useUpdateWalletMutation } from "@/shared/api/api.ts";

export const HomeHeader = () => {
  const [tonConnectUI] = useTonConnectUI();
  const { id_tg, username } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const [updateWallet] = useUpdateWalletMutation();

  const updateWalletOnServer = (walletAddress: string | null) => {
    if (id_tg != null) {
      updateWallet({ id_tg, walletAddress })
        .unwrap()
        .then((data: AuthData) => {
          const { wallet_address } = data.user;
          dispatch(setWalletAddress(wallet_address));
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
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
