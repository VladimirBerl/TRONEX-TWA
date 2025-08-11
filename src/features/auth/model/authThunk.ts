import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthResponse {
  id_tg: string | null;
  farm_balance: number;
  clicks_today: number;
  level: number;
  investment_balance: number | string;
}

export const sendAuth = createAsyncThunk(
  "auth/sendAuth",
  async ({ first_name, id_tg }: { first_name: string; id_tg: string }, thunkAPI) => {
    const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/api/auth`, {
        username: first_name,
        id_tg: id_tg,
      });
      const { farm_balance, clicks_today, level, investment_balance } = response.data;

      const round6 = (num: number | string): number => parseFloat(Number(num).toFixed(6));

      return {
        id_tg,
        farm_balance: round6(farm_balance),
        clicks_today,
        level,
        investment_balance: round6(investment_balance),
      };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Auth error");
    }
  },
);
