import { getAccessTokenBearer } from "@/shared/api/token";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface ClickResponse {
  farm_balance: number;
  clicks_today: number;
  reward_added: number;
}

export const sendClick = createAsyncThunk("user/sendClick", async (id_tg: string, thunkAPI) => {
  const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

  try {
    const response = await axios.patch<ClickResponse>(
      `${API_URL}/api/click`,
      {
        id_tg,
        clicks: 1,
      },
      { headers: { Authorization: getAccessTokenBearer() } },
    );

    const { farm_balance, clicks_today, reward_added } = response.data;
    const round6 = (n: number) => parseFloat(n.toFixed(6));

    return {
      farm_balance: round6(farm_balance),
      clicks_today,
      reward_added,
    };
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("Click error");
  }
});
