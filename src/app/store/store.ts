import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/features/auth/model/slice/userSlice.ts";
import levelsReducer from "@/features/levels/model/slice/levelsSlice.ts";

export const store = configureStore({
  reducer: {
    user: userReducer,
    levels: levelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
