import { Level } from "@/shared/api/upgrade/types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
});

export const { setLevels } = levelsSlice.actions;
export default levelsSlice.reducer;
