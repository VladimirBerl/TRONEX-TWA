import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "@/entities/user/model/userSlice";
import levelsReducer from "@/entities/level/model/levelsSlice";
import tasksReducer from "@/entities/bonus/model/tasksSlice.ts";
import withdrawReducer from "@/entities/withdraw-history/model/withdrawalsSlice.ts";
import depositReducer from "@/entities/deposit-history/model/depositHistorySlice";
import { api } from "@/shared/api/api.ts";

const rootReducer = combineReducers({
  user: userReducer,
  levels: levelsReducer,
  tasks: tasksReducer,
  withdrawals: withdrawReducer,
  deposits: depositReducer,
  [api.reducerPath]: api.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "tasks", "withdrawals", "deposits"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
