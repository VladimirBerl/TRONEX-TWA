import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface checkTaskRes {
  status: string;
}

interface CheckTaskArgs {
  id_tg: string;
  id: number;
}

export const checkTask = createAsyncThunk<string, CheckTaskArgs, { rejectValue: string }>(
  "tasks/checkTask",
  async ({ id_tg, id }, thunkAPI) => {
    const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

    try {
      const response = await axios.patch<checkTaskRes>(`${API_URL}/api/tasks/${id}/check`, {
        id_tg: id_tg,
      });
      const { status } = response.data;
      return status;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error", error);
      }

      return thunkAPI.rejectWithValue("Failed to check task");
    }
  },
);
