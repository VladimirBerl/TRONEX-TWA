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
  // Клики
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.sendClick.matchFulfilled, (state, { payload }) => {
      return { ...state, ...payload };
    });

    builder.addMatcher(api.endpoints.sendClick.matchFulfilled, (state, { payload }) => {
      return { ...state, ...payload };
    });

    builder.addMatcher(api.endpoints.getReferrals.matchFulfilled, (state, { payload }) => {
      state.referrals = payload;
    });

    builder.addMatcher(api.endpoints.sendAuth.matchFulfilled, (state, { payload }) => {
      const { user, token } = payload;
      state.id_tg = user.id_tg;
      state.farm_balance = user.farm_balance;
      state.clicks_today = user.clicks_today;
      state.level = user.level;
      state.investment_balance = user.investment_balance;
      state.wallet_address = user.wallet_address;
      state.status = user.status;
      state.username = user.username;
      state.token = token;

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
