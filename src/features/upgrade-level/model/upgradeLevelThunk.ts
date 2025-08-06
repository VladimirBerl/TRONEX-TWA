import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Level } from "@/shared/api/upgrade/types.ts";

interface UpgradeLevelParams {
  id_tg: string;
  levels: Level[];
  level: number;
  investment_balance: number;
  price: number;
}

interface UpgradeLevelResult {
  updatedLevels: Level[];
  newLevel: number;
  newBalance: number;
}

export const upgradeLevel = createAsyncThunk<UpgradeLevelResult, UpgradeLevelParams>(
  "user/upgradeLevel",
  async ({ id_tg, levels, level, investment_balance, price }, thunkAPI) => {
    const API_URL = import.meta.env.VITE_API_BASE_URL as string;

    try {
      await axios.patch<Level[]>(`${API_URL}/api/upgrade-level`, {
        id_tg,
      });

      const updatedLevels: Level[] = levels.slice(1);

      return {
        updatedLevels,
        newLevel: level + 1,
        newBalance: investment_balance - price,
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Response:", error.response?.data);
      } else {
        console.error("Unknown error:", error);
      }

      return thunkAPI.rejectWithValue("INSUFFICIENT_FUNDS");
    }
  },
);
