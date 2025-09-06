import { createSlice } from "@reduxjs/toolkit";
import { api } from "@/shared/api/api.ts";
import { BonusTask } from "@/shared/types/tasks.ts";

export interface BonusTasksState {
  tasks: BonusTask[];
  page: number;
  total: number;
  status: string;
}

const initialState: BonusTasksState = {
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
    builder.addMatcher(api.endpoints.checkBonusTask.matchFulfilled, (state, action) => {
      const { status } = action.payload;
      const updatedStatus = status;
      const { id } = action.meta.arg.originalArgs;

      const task = state.tasks.find((t) => t.id === id);
      if (task) task.status = updatedStatus;
    });

    builder.addMatcher(api.endpoints.getBonusTasks.matchFulfilled, (state, { payload }) => {
      const { tasks, page, total } = payload;

      state.page = page;
      state.total = total;
      state.tasks = page === 1 ? tasks : [...state.tasks, ...tasks];
    });
  },
});

export default tasksSlice.reducer;
