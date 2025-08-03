import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id_tg: string | null;
}

const initialState: UserState = {
  id_tg: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIdTg: (state, action: PayloadAction<string>): void => {
      state.id_tg = action.payload;
    },
  },
})

export const { setIdTg } = userSlice.actions;
export default userSlice.reducer;
