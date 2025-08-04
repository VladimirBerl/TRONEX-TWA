import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id_tg: string | null;
  level: number;
  farm_balance: number;
  clicks_today: number;
  investment_balance: number;
}

const initialState: UserState = {
  id_tg: null,
  level: 0,
  farm_balance: 0,
  clicks_today: 0,
  investment_balance: 1,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIdTg: (state, action: PayloadAction<string>): void => {
      state.id_tg = action.payload;
    },
    setLevel: (state, action: PayloadAction<number>): void => {
      state.level = action.payload;
    },
    setFarmBalance: (state, action: PayloadAction<number>): void => {
      state.farm_balance = action.payload;
    },
    setClicksToday: (state, action: PayloadAction<number>): void => {
      state.clicks_today = action.payload;
    },
    setInvestmentBalance: (state, action: PayloadAction<number>): void => {
      state.investment_balance = action.payload;
    },
  },
})

export const { setIdTg, setLevel, setFarmBalance, setClicksToday, setInvestmentBalance } = userSlice.actions;
export default userSlice.reducer;
