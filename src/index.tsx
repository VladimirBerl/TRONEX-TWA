import '@telegram-apps/telegram-ui/dist/styles.css';

import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

import { Root } from '@/app/provider/root';
import { init, EnvUnsupported } from '@/shared/config/twa';
import '@/shared/config/twa/mockEnv';

import '@/app/styles/index.css';
import '@/app/styles/typography.css';

// Mock the environment in case, we are outside Telegram.

const root = ReactDOM.createRoot(document.getElementById('root')!);

// TODO Временно отключил логирование ошибки ton connect
window.addEventListener('unhandledrejection', (event) => {
  const reason = event.reason as unknown;

  if (
    reason instanceof Error &&
    reason.message.includes('Operation aborted')
  ) {
    event.preventDefault();
  }
});


try {
  const launchParams = retrieveLaunchParams();
  const { tgWebAppPlatform: platform } = launchParams;
  const debug = (launchParams.tgWebAppStartParam || '').includes('platformer_debug') || import.meta.env.DEV;

  // Configure all application dependencies.
  await init({
    debug,
    eruda: debug && ['ios', 'android'].includes(platform),
    mockForMacOS: platform === 'macos',
  }).then(() => {
    root.render(
      <StrictMode>
        <Root />
      </StrictMode>
    );
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (_e) {
  root.render(<EnvUnsupported />);
}
