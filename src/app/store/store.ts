import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "@/entities/user/model/userSlice";
import levelsReducer from "@/entities/level/model/levelsSlice";
import tasksReducer from "@/features/bonus/model/tasksSlice";
import withdrawReducer from "@/features/withdraw-history/model/withdrawSlice.ts";

const rootReducer = combineReducers({
  user: userReducer,
  levels: levelsReducer,
  tasks: tasksReducer,
  withdraw_history: withdrawReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "tasks", "withdraw_history"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
