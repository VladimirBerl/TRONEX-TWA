import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: number; status: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

export const { setTasks, updateTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
