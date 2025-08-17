import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Task } from "@/entities/bonus/model/tasksSlice.ts";

interface tasksRes {
  tasks: Task[];
  page: number;
  total: number;
}

interface getTasksArgs {
  id_tg: string;
  page?: number;
}

export const getTasks = createAsyncThunk<tasksRes, getTasksArgs, { rejectValue: string }>(
  "tasks/getTasks",
  async ({ id_tg, page = 1 }, thunkAPI) => {
    const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

    try {
      const response = await axios.get<tasksRes>(
        `${API_URL}/api/users/${id_tg}/tasks?page=${page}`,
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Failed to fetch tasks");
    }
  },
);
