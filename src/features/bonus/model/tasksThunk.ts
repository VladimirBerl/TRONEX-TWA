import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "./tasksSlice";

export const getTasks = createAsyncThunk<Task[], string, { rejectValue: string }>(
  "tasks/getTasks",
  async (id_tg, thunkAPI) => {
    const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

    try {
      const response = await axios.get<{ tasks: Task[] }>(`${API_URL}/api/users/${id_tg}/tasks`);
      return response.data.tasks;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to fetch tasks");
    }
  },
);
