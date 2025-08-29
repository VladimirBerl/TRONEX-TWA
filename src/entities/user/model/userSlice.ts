import { createSlice } from "@reduxjs/toolkit";
import { getReferrals, sendClick, upgradeLevel } from "@/features";
import { ReferralsInfo } from "@/features/referrals/model/referralThunk.ts";
import { api } from "@/shared/api/api.ts";

export interface UserState {
  reward_added: number;
  referrals: ReferralsInfo | null;

  id_tg: string | null;
  farm_balance: string;
  clicks_today: number;
  level: number;
  investment_balance: string;
  wallet_address: string | null;
  status: string;
  username: string | null;

  loading: boolean;
}

const initialState: UserState = {
  reward_added: 0,
  referrals: null,

  id_tg: null,
  farm_balance: "0",
  clicks_today: 0,
  level: 0,
  investment_balance: "0",
  wallet_address: null,
  status: "",
  username: null,

  loading: false,
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
    builder.addCase(sendClick.fulfilled, (state, action) => {
      const { farm_balance, clicks_today, reward_added } = action.payload;
      state.farm_balance = String(farm_balance);
      state.clicks_today = clicks_today;
      state.reward_added = reward_added;
    });

    builder.addCase(upgradeLevel.fulfilled, (state, action) => {
      const { newLevel, newBalance } = action.payload;
      state.level = newLevel;
      state.investment_balance = String(newBalance);
    });

    builder.addCase(getReferrals.fulfilled, (state, action) => {
      state.referrals = action.payload;
    });

    builder.addMatcher(api.endpoints.sendAuth.matchFulfilled, (state, { payload }) => {
      const { user } = payload;
      state.id_tg = user.id_tg;
      state.farm_balance = user.farm_balance;
      state.clicks_today = user.clicks_today;
      state.level = user.level;
      state.investment_balance = user.investment_balance;
      state.wallet_address = user.wallet_address;
      state.status = user.status;
      state.username = user.username;
      state.loading = false;
    });

    builder.addMatcher(api.endpoints.sendAuth.matchPending, (state) => {
      state.loading = true;
    });

    builder.addMatcher(api.endpoints.sendAuth.matchRejected, (state) => {
      state.loading = false;
    });
  },
});

export const { setWalletAddress } = userSlice.actions;
export default userSlice.reducer;
