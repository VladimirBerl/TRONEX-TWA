import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthData, FarmClickData } from "@/shared/types/user.ts";
import { LevelInfo, LevelUpgradeResult } from "@/shared/types/levels.ts";

const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

interface DepositInfo {
  id: number;
  network: string;
  amount: string;
  status: string;
  createdAt: string;
}

interface DepositData {
  page: number;
  total: number;
  deposits: DepositInfo[];
}

export interface ReferralsInfo {
  all_referrals: string;
  all_referrals_deposit: string;
  invite_link: string;
  deposit_amount: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // REGISTER
    sendAuth: builder.mutation<AuthData, string>({
      query: (initDataRaw: string) => ({
        url: "/api/auth",
        method: "POST",
        body: initDataRaw,
        headers: {
          "Content-Type": "text/plain",
        },
      }),
    }),

    // CLICKS
    sendClick: builder.mutation<FarmClickData, string>({
      query: (id_tg) => ({
        url: `${API_URL}/api/click`,
        method: "PATCH",
        body: { id_tg, clicks: 1 },
      }),
    }),

    // LEVELS
    getLevels: builder.query<LevelInfo[], string>({
      query: (id_tg) => `/api/users/${id_tg}/levels`,
    }),

    // REFERRALS
    getReferrals: builder.query<ReferralsInfo, string>({
      query: (id_tg) => `/api/users/${id_tg}/referrals`,
    }),

    // WALLET INFO
    updateWallet: builder.mutation<AuthData, { id_tg: string; walletAddress: string | null }>({
      query: ({ id_tg, walletAddress }) => ({
        url: `/api/users/${id_tg}/wallet_address`,
        method: "PATCH",
        body: { wallet_address: walletAddress },
      }),
    }),

    // DEPOSIT HISTORY
    getDepositHistory: builder.query<DepositData, { id_tg: string; page: number }>({
      query: ({ id_tg, page = 1 }) => `${API_URL}/api/deposit/${id_tg}?page=${page}`,
    }),

    // UPGRADE LEVEL
    upgradeLevel: builder.mutation<LevelUpgradeResult, string>({
      query: (id_tg) => ({
        url: `/api/upgrade-level`,
        method: "PATCH",
        body: { id_tg },
      }),
    }),
  }),
});

export const {
  useSendAuthMutation,
  useGetLevelsQuery,
  useLazyGetLevelsQuery,
  useLazyGetReferralsQuery,
  useUpdateWalletMutation,
  useLazyGetDepositHistoryQuery,
  useSendClickMutation,
  useUpgradeLevelMutation,
} = api;
