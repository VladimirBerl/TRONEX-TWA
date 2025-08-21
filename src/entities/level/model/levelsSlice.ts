import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { upgradeLevel } from "@/features/upgrade-level/model/upgradeLevelThunk.ts";
import { api } from "@/shared/api/api.ts";

interface LevelData {
  level: number;
  price: string;
  percent: number;
}

export interface LevelState {
  levels: LevelData[] | null;
}

const initialState: LevelState = {
  levels: null,
};

export const levelsSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {
    setLevels: (state, action: PayloadAction<LevelData[] | null>): void => {
      state.levels = action.payload;
    },
  },

  extraReducers: (builder): void => {
    builder.addCase(upgradeLevel.fulfilled, (state, action) => {
      const { updatedLevels } = action.payload;
      state.levels = updatedLevels;
    });
    builder.addMatcher(api.endpoints.getLevels.matchFulfilled, (state, action) => {
      state.levels = action.payload;
    });
  },
});

export const { setLevels } = levelsSlice.actions;
export default levelsSlice.reducer;
