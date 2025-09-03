import { createSlice } from "@reduxjs/toolkit";
import { api } from "@/shared/api/api.ts";
import { LevelInfo } from "@/shared/types/levels.ts";

export interface LevelState {
  levels: LevelInfo[] | null;
}

const initialState: LevelState = {
  levels: null,
};

export const levelsSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder.addMatcher(api.endpoints.upgradeLevel.matchFulfilled, (state, { payload }) => {
      return { ...state, ...payload };
    });
    builder.addMatcher(api.endpoints.getLevels.matchFulfilled, (state, action) => {
      state.levels = action.payload;
    });
  },
});

export default levelsSlice.reducer;
