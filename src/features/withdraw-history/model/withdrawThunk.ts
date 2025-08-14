import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WithdrawHistoryInfo } from "@/features/withdraw-history/model/withdrawSlice.ts";

export const getWithdrawHistory = createAsyncThunk<
  WithdrawHistoryInfo[],
  string,
  {
    rejectValue: string;
  }
>("withdraw_history", async (id_tg, thunkAPI) => {
  const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

  try {
    const response = await axios.get<WithdrawHistoryInfo[]>(
      `${API_URL}/api/withdraw?id_tg=${id_tg}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("Failed to get withdraw history");
  }
});
