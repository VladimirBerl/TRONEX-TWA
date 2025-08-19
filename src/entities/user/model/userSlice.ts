import { createSlice } from "@reduxjs/toolkit";
import { getReferrals, sendAuth, sendClick, upgradeLevel } from "@/features";
import { ReferralsInfo } from "@/features/referrals/model/referralThunk.ts";

export interface UserState {
  loading: boolean;
  username: string | null;
  id_tg: string | null;
  level: number;
  farm_balance: number;
  clicks_today: number;
  reward_added: number;
  investment_balance: number;
  wallet_address: string | null;
  status: string;
  referrals: ReferralsInfo | null;
}

const initialState: UserState = {
  loading: false,
  username: null,
  id_tg: null,
  level: 0,
  farm_balance: 0,
  clicks_today: 0,
  reward_added: 0,
  investment_balance: 1,
  wallet_address: null,
  status: "",
  referrals: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setWalletAddress: (state, action: { payload: string | null }) => {
      state.wallet_address = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(sendAuth.fulfilled, (state, action) => {
        const {
          id_tg,
          farm_balance,
          clicks_today,
          level,
          investment_balance,
          wallet_address,
          status,
          username,
        } = action.payload;

        state.id_tg = id_tg;
        state.farm_balance = farm_balance;
        state.clicks_today = clicks_today;
        state.level = level;
        state.investment_balance = investment_balance;
        state.wallet_address = wallet_address;
        state.status = status;
        state.username = username;
        state.loading = false;
      })

      .addCase(sendAuth.pending, (state) => {
        state.loading = true;
      })

      .addCase(sendAuth.rejected, (state) => {
        state.loading = false;
      })

      .addCase(sendClick.fulfilled, (state, action) => {
        const { farm_balance, clicks_today, reward_added } = action.payload;

        state.farm_balance = farm_balance;
        state.clicks_today = clicks_today;
        state.reward_added = reward_added;
      })

      .addCase(upgradeLevel.fulfilled, (state, action) => {
        const { newLevel, newBalance } = action.payload;

        state.level = newLevel;
        state.investment_balance = newBalance;
      })

      .addCase(getReferrals.fulfilled, (state, action) => {
        state.referrals = action.payload;
      });
  },
});

export const { setWalletAddress } = userSlice.actions;
export default userSlice.reducer;
