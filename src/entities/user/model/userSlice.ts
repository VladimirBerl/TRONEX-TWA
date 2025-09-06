import { createSlice } from "@reduxjs/toolkit";
import { api } from "@/shared/api/api.ts";
import { UserState, FarmClickData } from "@/shared/types/user.ts";

const initialState: UserState & FarmClickData = {
  reward_added: 0,
  farm_balance: "0",
  clicks_today: 0,

  referrals: null,

  id_tg: null,
  level: 0,
  investment_balance: "0",
  wallet_address: null,
  status: "",
  username: null,
  token: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setWalletAddress: (state, action: { payload: string | null }) => {
      state.wallet_address = action.payload;
    },

    setInvestmentBalance: (state, action: { payload: string }) => {
      state.investment_balance = action.payload;
    },

    setFarmBalance: (state, action: { payload: string }) => {
      if (action.payload) state.farm_balance = action.payload;
    },

    setNewLevel: (state, action: { payload: { newLevel: number; newBalance: string } }) => {
      state.level = action.payload.newLevel;
      state.investment_balance = action.payload.newBalance;
    },

    setNewBalance: (
      state,
      action: { payload: { newInvestmentBalance: string; newFarmBalance: string } },
    ) => {
      state.farm_balance = action.payload.newFarmBalance;
      state.investment_balance = action.payload.newInvestmentBalance;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.sendClick.matchFulfilled, (state, { payload }) => {
      return { ...state, ...payload };
    });

    builder.addMatcher(api.endpoints.getReferrals.matchFulfilled, (state, { payload }) => {
      state.referrals = payload;
    });

    builder.addMatcher(api.endpoints.sendAuth.matchFulfilled, (state, { payload }) => {
      return { ...state, ...payload.user };
    });
  },
});

export const {
  setWalletAddress,
  setInvestmentBalance,
  setNewLevel,
  setNewBalance,
  setFarmBalance,
} = userSlice.actions;
export default userSlice.reducer;
