import { createContext, ReactNode, useEffect, useState } from "react";
import {
  initDataRaw as _initDataRaw,
  initDataState as _initDataState,
  useSignal,
} from "@telegram-apps/sdk-react";
import {
  useLazyGetLevelsQuery,
  useLazyGetReferralsQuery,
  useSendAuthMutation,
} from "@/shared/api/api";
import { AuthData } from "@/shared/types/user";
import { isApiError } from "@/shared/lib";

interface AuthContextType {
  token: string | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const initDataRaw = useSignal(_initDataRaw);
  const initDataState = useSignal(_initDataState);
  const [sendAuth] = useSendAuthMutation();
  const [getLevels] = useLazyGetLevelsQuery();
  const [getReferrals] = useLazyGetReferralsQuery();

  const handleAuth = async (initDataRaw: string) => {
    const data: AuthData = await sendAuth(initDataRaw).unwrap();

    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      return data.token;
    }
  };

  useEffect((): void => {
    if (!initDataState || !initDataRaw) return;
    const { first_name, id } = initDataState?.user ?? {};

    if (!first_name || !id) return;

    const id_tg: string = id.toString();

    const run = async () => {
      try {
        const token = await handleAuth(initDataRaw);

        if (!token) return;

        await getLevels(id_tg);
        await getReferrals(id_tg);
      } catch (error: unknown) {
        if (isApiError(error) && error.status === 401) {
          await handleAuth(initDataRaw);
        }
        console.error(error);
      }
    };

    void run();
  }, [initDataRaw, initDataState]);

  return <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>;
};
