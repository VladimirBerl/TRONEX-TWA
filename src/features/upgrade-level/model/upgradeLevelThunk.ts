import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { LevelData } from "@/shared/api/api.ts";

interface UpgradeLevelParams {
  id_tg: string;
  levels: LevelData[];
  level: number;
  investment_balance: string;
  price: number;
}

interface UpgradeLevelResult {
  updatedLevels: LevelData[];
  newLevel: number;
  newBalance: number;
}

export const upgradeLevel = createAsyncThunk<UpgradeLevelResult, UpgradeLevelParams>(
  "user/upgradeLevel",
  async ({ id_tg, levels, level, investment_balance, price }, thunkAPI) => {
    const API_URL = import.meta.env.VITE_API_BASE_URL as string;

    try {
      await axios.patch<LevelData[]>(`${API_URL}/api/upgrade-level`, {
        id_tg,
      });

      const updatedLevels: LevelData[] = levels.slice(1);

      return {
        updatedLevels,
        newLevel: level + 1,
        newBalance: parseFloat(investment_balance) - price,
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
