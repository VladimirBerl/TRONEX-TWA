import { createSlice } from "@reduxjs/toolkit";
import { api } from "@/shared/api/api.ts";

export interface DepositInfo {
  id: number;
  network: string;
  amount: string;
  status: string;
  createdAt: string;
}

export interface DepositData {
  page: number;
  total: number;
  deposits: DepositInfo[];
}

const initialState: DepositData = {
  page: 1,
  total: 0,
  deposits: [],
};

export const depositHistorySlice = createSlice({
  name: "deposits",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getDepositHistory.matchFulfilled, (state, { payload }) => {
      const { page, total, deposits } = payload;

      state.page = page;
      state.total = total;
      state.deposits = page === 1 ? deposits : [...state.deposits, ...deposits];
    });
  },
});

export default depositHistorySlice.reducer;
