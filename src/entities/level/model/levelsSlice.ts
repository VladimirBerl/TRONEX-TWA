import { Level } from "@/shared/api/upgrade/types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getLevels } from "@/features/levels/model/levelsThunk.ts";
import { upgradeLevel } from "@/features/upgrade-level/model/upgradeLevelThunk.ts";

export interface LevelState {
  levels: Level[] | null;
}

const initialState: LevelState = {
  levels: null,
};

export const levelsSlice = createSlice({
  name: "levels",
  initialState,
  reducers: {
    setLevels: (state, action: PayloadAction<Level[] | null>): void => {
      state.levels = action.payload;
    },
  },

  extraReducers: (builder): void => {
    builder
      .addCase(getLevels.fulfilled, (state, action) => {
        state.levels = action.payload;
      })
      .addCase(upgradeLevel.fulfilled, (state, action) => {
        const { updatedLevels } = action.payload;
        state.levels = updatedLevels;
      });
  },
});

export const { setLevels } = levelsSlice.actions;
export default levelsSlice.reducer;
