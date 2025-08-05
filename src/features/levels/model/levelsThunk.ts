import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Level } from "@/shared/api/upgrade/types.ts";

export const getLevels = createAsyncThunk("levels/getLevels", async (_arg: void, thunkAPI) => {
  const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

  try {
    const response = await axios.get<Level[]>(`${API_URL}/api/levels`);
    return response.data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("Get levels error");
  }
});
