import { createSlice } from "@reduxjs/toolkit";
import { getReferrals, sendAuth, sendClick, upgradeLevel } from "@/features";
import { ReferralsInfo } from "@/features/referrals/model/referralThunk.ts";

export interface UserState {
  id_tg: string | null;
  level: number;
  farm_balance: number;
  clicks_today: number;
  investment_balance: number;
  wallet_address: string | null;
  referrals: ReferralsInfo | null;
}

const initialState: UserState = {
  id_tg: null,
  level: 0,
  farm_balance: 0,
  clicks_today: 0,
  investment_balance: 1,
  wallet_address: null,
  referrals: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder): void => {
    builder
      .addCase(sendAuth.fulfilled, (state, action): void => {
        const { id_tg, farm_balance, clicks_today, level, investment_balance, wallet_address } =
          action.payload;

        state.id_tg = id_tg;
        state.farm_balance = farm_balance;
        state.clicks_today = clicks_today;
        state.level = level;
        state.investment_balance = investment_balance;
        state.wallet_address = wallet_address;
      })

      .addCase(sendClick.fulfilled, (state, action) => {
        const { farm_balance, clicks_today } = action.payload;

        state.farm_balance = farm_balance;
        state.clicks_today = clicks_today;
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

export default userSlice.reducer;
