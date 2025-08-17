import { createSlice } from "@reduxjs/toolkit";
import { getDepositHistory } from "@/features";

export interface Deposit {
  id: number;
  network: string;
  amount: string;
  status: string;
  createdAt: string;
}

export interface DepositHistory {
  page: number;
  total: number;
  deposits: Deposit[];
}

const initialState: DepositHistory = {
  page: 1,
  total: 0,
  deposits: [],
};

export const depositHistorySlice = createSlice({
  name: "deposits",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getDepositHistory.fulfilled, (state, action) => {
      const { page, total, deposits } = action.payload;

      state.page = page;
      state.total = total;
      state.deposits = page === 1 ? deposits : [...state.deposits, ...deposits];
    });
  },
});

export default depositHistorySlice.reducer;
