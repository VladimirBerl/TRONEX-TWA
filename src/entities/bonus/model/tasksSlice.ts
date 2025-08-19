import { createSlice } from "@reduxjs/toolkit";
import { getTasks } from "@/features/bonus/model/tasksThunk.ts";
import { checkTask } from "@/features";

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
  status: string;
}

const initialState: TasksState = {
  tasks: [],
  page: 1,
  total: 0,
  status: "pending",
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

    builder.addCase(checkTask.fulfilled, (state, action) => {
      const updatedStatus = action.payload;
      const { id } = action.meta.arg;

      const task = state.tasks.find((t) => t.id === id);

      if (task) {
        task.status = updatedStatus;
      }
    });
  },
});

export default tasksSlice.reducer;
