import "@telegram-apps/telegram-ui/dist/styles.css";

import ReactDOM from "react-dom/client";
import { retrieveLaunchParams } from "@telegram-apps/sdk-react";

import { init, EnvUnsupported } from "@/shared/config/twa";
import { Provider } from "react-redux";
import { persistor, store } from "@/app/store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Root } from "@/app/provider/root";

import "@/shared/config/twa/mockEnv";
import "@/app/styles/index.css";
import "@/app/styles/typography.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);

// TODO Временно отключил логирование ошибки ton connect
window.addEventListener("unhandledrejection", (event) => {
  const reason = event.reason as unknown;

  if (reason instanceof Error && reason.message.includes("Operation aborted")) {
    event.preventDefault();
  }
});

try {
  const launchParams = retrieveLaunchParams();
  const { tgWebAppPlatform: platform } = launchParams;
  const debug =
    (launchParams.tgWebAppStartParam || "").includes("platformer_debug") || import.meta.env.DEV;

  await init({
    debug,
    eruda: debug && ["ios", "android"].includes(platform),
    mockForMacOS: platform === "macos",
  }).then(() => {
    root.render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>,
    );
  });
} catch {
  root.render(<EnvUnsupported />);
}
