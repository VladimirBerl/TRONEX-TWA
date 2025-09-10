import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AuthData, FarmClickData, UpdateWalletData } from "@/shared/types/user.ts";
import { LevelInfo, LevelUpgradeResult } from "@/shared/types/levels.ts";
import { DepositData } from "@/shared/types/deposit.ts";
import { BonusTasksRes } from "@/shared/types/tasks.ts";
import { WithdrawData } from "@/shared/types/withdraw.ts";
import { ReferralsInfo } from "@/shared/types/referral.ts";

const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

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

    // UPGRADE LEVEL
    upgradeLevel: builder.mutation<LevelUpgradeResult, string>({
      query: (id_tg) => ({
        url: `/api/upgrade-level`,
        method: "PATCH",
        body: { id_tg },
      }),
    }),

    // REFERRALS
    getReferrals: builder.query<ReferralsInfo, string>({
      query: (id_tg) => `/api/users/${id_tg}/referrals`,
    }),

    // UPDATE WALLET
    updateWallet: builder.mutation<
      UpdateWalletData,
      { id_tg: string; walletAddress: string | null }
    >({
      query: ({ id_tg, walletAddress }) => ({
        url: `/api/users/${id_tg}/wallet-address`,
        method: "PATCH",
        body: { wallet_address: walletAddress },
      }),
    }),

    // DEPOSIT HISTORY
    getDepositHistory: builder.query<DepositData, { id_tg: string; page: number }>({
      query: ({ id_tg, page = 1 }) => `/api/deposit/${id_tg}?page=${page}`,
    }),

    // WITHDRAW HISTORY
    getWithdrawHistory: builder.query<WithdrawData, { id_tg: string; page: number }>({
      query: ({ id_tg, page = 1 }) => `/api/withdraw/${id_tg}?page=${page}`,
    }),

    // WITHDRAW
    withdraw: builder.mutation<
      string,
      { id_tg: string; walletAddress: string; withdrawAmount: string }
    >({
      query: ({ id_tg, walletAddress, withdrawAmount }) => ({
        url: `/api/withdraw/${id_tg}/create`,
        method: "POST",
        body: {
          network: "TON",
          wallet_address: walletAddress,
          amount: withdrawAmount,
        },
      }),
    }),

    // DEPOSIT
    deposit: builder.mutation<
      string,
      { id_tg: string; wallet_address: string; amount: string; boc: string }
    >({
      query: ({ id_tg, amount, wallet_address, boc }) => ({
        url: `${API_URL}/api/deposit/${id_tg}/create`,
        method: "POST",
        body: {
          network: "TON",
          amount: amount,
          wallet_address: wallet_address,
          boc: boc,
        },
      }),
    }),

    // GET BOUS TASKS
    getBonusTasks: builder.query<BonusTasksRes, { id_tg: string; page?: number }>({
      query: ({ id_tg, page = 1 }) => `/api/users/${id_tg}/tasks?page=${page}`,
    }),

    // CHECK BONUS TASK
    checkBonusTask: builder.mutation<
      { reward: string; status: string },
      { id_tg: string; id: number }
    >({
      query: ({ id_tg, id }) => ({
        url: `/api/tasks/${id}/check`,
        method: "PATCH",
        body: { id_tg },
      }),
    }),
  }),
});

export const {
  useLazyGetWithdrawHistoryQuery,
  useSendAuthMutation,
  useGetLevelsQuery,
  useLazyGetLevelsQuery,
  useLazyGetReferralsQuery,
  useUpdateWalletMutation,
  useLazyGetDepositHistoryQuery,
  useSendClickMutation,
  useUpgradeLevelMutation,
  useWithdrawMutation,
  useDepositMutation,
  useLazyGetBonusTasksQuery,
  useCheckBonusTaskMutation,
} = api;
