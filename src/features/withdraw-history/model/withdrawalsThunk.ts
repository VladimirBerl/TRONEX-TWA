import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WithdrawHistoryInfo } from "@/entities/withdraw-history/model/withdrawalsSlice.ts";
import { getAccessTokenBearer } from "@/shared/api/token";

interface getWithdrawHistoryArgs {
  id_tg: string;
  page?: number;
}

export const getWithdrawHistory = createAsyncThunk<
  WithdrawHistoryInfo,
  getWithdrawHistoryArgs,
  {
    rejectValue: string;
  }
>("withdraw_history", async ({ id_tg, page = 1 }, thunkAPI) => {
  const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

  try {
    const response = await axios.get<WithdrawHistoryInfo>(
      `${API_URL}/api/withdraw/${id_tg}?page=${page}`,
      { headers: { Authorization: getAccessTokenBearer() } },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("Failed to get withdraw history");
  }
});
