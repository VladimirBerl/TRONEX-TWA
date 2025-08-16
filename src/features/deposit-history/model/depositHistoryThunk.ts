import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DepositHistoryInfo } from "@/entities/deposit-history/model/depositHistorySlice.ts";

export const getDepositHistory = createAsyncThunk<
  DepositHistoryInfo,
  string,
  {
    rejectValue: string;
  }
>("deposit-history", async (id_tg, thunkAPI) => {
  const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

  try {
    const response = await axios.get<DepositHistoryInfo>(`${API_URL}/api/deposit/${id_tg}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("Failed to get deposit history");
  }
});
