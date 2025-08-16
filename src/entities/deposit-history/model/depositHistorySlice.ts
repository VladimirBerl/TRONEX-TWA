import { createSlice } from "@reduxjs/toolkit";
import { getDepositHistory } from "@/features";

export interface Deposit {
  id: number;
  network: string;
  amount: string;
  status: string;
  createdAt: string;
}

export interface DepositHistoryInfo {
  page: number;
  total: number;
  deposits: Deposit[];
}

const initialState: DepositHistoryInfo = {
  page: 0,
  total: 0,
  deposits: [],
};

export const depositHistorySlice = createSlice({
  name: "withdrawals",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getDepositHistory.fulfilled, (state, action) => {
      const { page, total, deposits } = action.payload;

      state.page = page;
      state.total = total;
      state.deposits = deposits;
    });
  },
});

export default depositHistorySlice.reducer;
