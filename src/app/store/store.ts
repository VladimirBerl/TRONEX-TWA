import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/entities/user/model/userSlice.ts";
import levelsReducer from "@/entities/level/model/levelsSlice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    levels: levelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = typeof store.dispatch;
