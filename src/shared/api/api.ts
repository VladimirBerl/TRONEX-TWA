import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

export interface AuthData {
  user: {
    id_tg: string | null;
    farm_balance: number;
    clicks_today: number;
    level: number;
    investment_balance: number;
    wallet_address: string | null;
    status: string;
    username: string | null;
  };
}

export interface LevelData {
  level: number;
  price: string;
  percent: number;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    // REGISTER
    sendAuth: builder.mutation<AuthData, string>({
      query: (initDataRaw) => ({
        url: "/api/auth",
        method: "POST",
        body: initDataRaw,
      }),
    }),
    // LEVELS
    getLevels: builder.query<LevelData[], string>({
      query: (id_tg) => `/api/users/${id_tg}/levels`,
    }),
    // WALLET INFO
    updateWallet: builder.mutation<AuthData, { id_tg: string; walletAddress: string | null }>({
      query: ({ id_tg, walletAddress }) => ({
        url: `/api/users/${id_tg}/wallet_address`,
        method: "PATCH",
        // TODO Под вопросом
        body: { wallet_address: walletAddress },
      }),
    }),
  }),
});

export const {
  useSendAuthMutation,
  useGetLevelsQuery,
  useLazyGetLevelsQuery,
  useUpdateWalletMutation,
} = api;
