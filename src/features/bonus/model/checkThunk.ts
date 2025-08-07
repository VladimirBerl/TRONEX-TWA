import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getTasks } from "@/features/bonus/model/tasksThunk.ts";

export const checkTask = createAsyncThunk<
  string,
  { id_tg: string; id: number },
  { rejectValue: string }
>("tasks/checkTask", async ({ id_tg, id }, thunkAPI) => {
  const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;
  const { dispatch } = thunkAPI;

  try {
    await axios.patch(`${API_URL}/api/tasks/${id}/check`, {
      id_tg: id_tg,
    });

    if (id_tg != null) void dispatch(getTasks(id_tg));

    return "Task checked successfully";
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown error", error);
    }

    return thunkAPI.rejectWithValue("Failed to check task");
  }
});
