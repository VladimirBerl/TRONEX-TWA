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
}

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

export default tasksSlice.reducer;
