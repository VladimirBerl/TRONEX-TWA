import { createSlice } from "@reduxjs/toolkit";
import { api } from "@/shared/api/api.ts";
import { WithdrawInfo } from "@/shared/types/withdraw.ts";

export interface WithdrawState {
  page: number;
  total: number;
  withdrawals: WithdrawInfo[];
}

const initialState: WithdrawState = {
  page: 1,
  total: 0,
  withdrawals: [],
};

export const withdrawalsSlice = createSlice({
  name: "withdrawals",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getWithdrawHistory.matchFulfilled, (state, { payload }) => {
      const { page, total, withdrawals } = payload;

      state.page = page;
      state.total = total;
      state.withdrawals = page === 1 ? withdrawals : [...state.withdrawals, ...withdrawals];
    });
  },
});

export default withdrawalsSlice.reducer;
