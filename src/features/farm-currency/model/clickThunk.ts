import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ClickResponse {
  farm_balance: number;
  clicks_today: number;
}

export const sendClick = createAsyncThunk("user/sendClick", async (id_tg: string, thunkAPI) => {
  const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

  try {
    const response = await axios.patch<ClickResponse>(`${API_URL}/api/click`, {
      id_tg,
      clicks: 1,
    });

    const { farm_balance, clicks_today } = response.data;
    const round6 = (n: number) => parseFloat(n.toFixed(6));

    return {
      farm_balance: round6(farm_balance),
      clicks_today,
    };
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("Click error");
  }
});
