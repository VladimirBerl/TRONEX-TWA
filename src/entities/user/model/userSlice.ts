import { createSlice } from "@reduxjs/toolkit";
import { sendAuth } from "@/features/auth/model/authThunk.ts";
import { sendClick } from "@/features/farm-currency/model/clickThunk.ts";
import { upgradeLevel } from "@/features/upgrade-level/model/upgradeLevelThunk.ts";

export interface UserState {
  id_tg: string | null;
  level: number;
  farm_balance: number;
  clicks_today: number;
  investment_balance: number;
}

const initialState: UserState = {
  id_tg: null,
  level: 0,
  farm_balance: 0,
  clicks_today: 0,
  investment_balance: 1,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},

  extraReducers: (builder): void => {
    builder
      .addCase(sendAuth.fulfilled, (state, action): void => {
        const { id_tg, farm_balance, clicks_today, level, investment_balance } = action.payload;

        state.id_tg = id_tg;
        state.farm_balance = farm_balance;
        state.clicks_today = clicks_today;
        state.level = level;
        state.investment_balance = investment_balance;
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
      });
  },
});

export default userSlice.reducer;
