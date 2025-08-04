import { useMemo } from "react";

import { retrieveLaunchParams, useSignal, isMiniAppDark } from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";
import { AppRouter } from "@/app/provider/router";
import { LevelProvider } from "@/app/provider/level-provider/LevelProvider.tsx";

export function App() {
  const lp = useMemo(() => retrieveLaunchParams(), []);
  const isDark = useSignal(isMiniAppDark);

  return (
    <LevelProvider>
      <AppRoot
        appearance={isDark ? "dark" : "light"}
        platform={["macos", "ios"].includes(lp.tgWebAppPlatform) ? "ios" : "base"}
      >
        <div className="overflow-y-auto h-full min-h-[100dvh] p-4 touch-manipulation">
          <AppRouter />
        </div>
      </AppRoot>
    </LevelProvider>
  );
}
