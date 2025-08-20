import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthResponse {
  user: {
    id_tg: string | null;
    farm_balance: number;
    clicks_today: number;
    level: number;
    investment_balance: number | string;
    wallet_address: string | null;
    status: string;
    username: string | null;
  };
}

export const sendAuth = createAsyncThunk(
  "auth/sendAuth",
  async ({ initDataRaw }: { initDataRaw: string }, thunkAPI) => {
    const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

    try {
      const response = await axios.post<AuthResponse>(`${API_URL}/api/auth`, {
        initDataRaw,
      });

      const {
        farm_balance,
        clicks_today,
        level,
        investment_balance,
        wallet_address,
        status,
        username,
        id_tg,
      } = response.data.user;

      const round6 = (num: number | string): number => parseFloat(Number(num).toFixed(6));

      return {
        id_tg,
        farm_balance: round6(farm_balance),
        clicks_today,
        level,
        investment_balance: round6(investment_balance),
        wallet_address,
        status,
        username,
      };
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Auth error");
    }
  },
);
