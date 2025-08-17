import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DepositHistory } from "@/entities/deposit-history/model/depositHistorySlice.ts";

interface getDepositHistoryArgs {
  id_tg: string;
  page?: number;
}

export const getDepositHistory = createAsyncThunk<
  DepositHistory,
  getDepositHistoryArgs,
  {
    rejectValue: string;
  }
>("deposit-history", async ({ id_tg, page = 1 }, thunkAPI) => {
  const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

  try {
    const response = await axios.get<DepositHistory>(
      `${API_URL}/api/deposit/${id_tg}?page=${page}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("Failed to get deposit history");
  }
});
