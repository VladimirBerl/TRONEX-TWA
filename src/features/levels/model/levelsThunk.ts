import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Level } from "@/shared/api/upgrade/types.ts";

export const getLevels = createAsyncThunk(
  "levels/getLevels",
  async ({ id_tg }: { id_tg: string }, thunkAPI) => {
    const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

    try {
      const response = await axios.get<Level[]>(`${API_URL}/api/users/${id_tg}/levels`);
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Get levels error");
    }
  },
);
