import { useMemo } from "react";
import { retrieveLaunchParams, useSignal, isMiniAppDark } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { AppRouter } from "@/app/provider/router";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { TonConnection } from "@/features";

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), []);
  const isDark = useSignal(isMiniAppDark);

  return (
    <AppRoot
      appearance={isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.tgWebAppPlatform) ? "ios" : "base"}
    >
      <TonConnectUIProvider manifestUrl="https://luckily-renewing-kookaburra.cloudpub.ru/tonconnect-manifest.json">
        <div className="absolute left-[80px]">
          <TonConnection />
        </div>

        <div className="overflow-y-auto h-full min-h-[100dvh] p-4 touch-manipulation">
          <AppRouter />
        </div>
      </TonConnectUIProvider>
    </AppRoot>
  );
}
