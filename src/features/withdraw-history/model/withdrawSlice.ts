import { createSlice } from "@reduxjs/toolkit";
import { getWithdrawHistory } from "@/features";

export interface WithdrawHistoryInfo {
  id: number;
  network: string;
  amount: string;
  status: string;
  createdAt: string;
}

export type WithdrawState = WithdrawHistoryInfo[];

const initialState: WithdrawState = [];

export const withdrawSlice = createSlice({
  name: "withdraw",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getWithdrawHistory.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export default withdrawSlice.reducer;
