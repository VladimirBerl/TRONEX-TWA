import { createSlice } from "@reduxjs/toolkit";
import { getTasks } from "@/features/bonus/model/tasksThunk.ts";

export interface Task {
  id: number;
  title: string;
  status: string;
  reward: string;
  reward_issued: boolean;
  url: string;
  imageUrl: string;
}

export interface TasksState {
  tasks: Task[];
  page: number;
  total: number;
}

const initialState: TasksState = {
  tasks: [],
  page: 1,
  total: 0,
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      const { tasks, page, total } = action.payload;

      state.page = page;
      state.total = total;
      state.tasks = page === 1 ? tasks : [...state.tasks, ...tasks];
    });
  },
});

export default tasksSlice.reducer;
