import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface ReferralsInfo {
  all_referrals: string;
  all_referrals_deposit: string;
  invite_link: string;
  deposit_amount: string;
}

export const getReferrals = createAsyncThunk<
  ReferralsInfo,
  string,
  {
    rejectValue: string;
  }
>("invite/getReferrals", async (id_tg, thunkAPI) => {
  const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

  try {
    const response = await axios.get<ReferralsInfo>(`${API_URL}/api/users/${id_tg}/referrals`);
    return response.data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue("Failed to fetch referrals");
  }
});
