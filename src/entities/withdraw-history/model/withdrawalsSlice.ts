import { createSlice } from "@reduxjs/toolkit";
import { getWithdrawHistory } from "@/features";

export interface Withdrawals {
  id: number;
  network: string;
  amount: string;
  status: string;
  createdAt: string;
}

export interface WithdrawHistoryInfo {
  page: number;
  total: number;
  withdrawals: Withdrawals[];
}

const initialState: WithdrawHistoryInfo = {
  page: 1,
  total: 0,
  withdrawals: [],
};

export const withdrawalsSlice = createSlice({
  name: "withdrawals",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getWithdrawHistory.fulfilled, (state, action) => {
      const { page, total, withdrawals } = action.payload;

      state.page = page;
      state.total = total;
      state.withdrawals = page === 1 ? withdrawals : [...state.withdrawals, ...withdrawals];
    });
  },
});

export default withdrawalsSlice.reducer;
