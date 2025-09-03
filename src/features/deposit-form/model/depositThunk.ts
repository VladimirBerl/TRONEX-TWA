import { getAccessTokenBearer } from "@/shared/api/token";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface depositArgs {
  id_tg: string;
  amount: string;
  wallet_address: string;
  hash: string;
}

export const deposit = createAsyncThunk<string, depositArgs>(
  "deposit/deposit",
  async ({ id_tg, amount, wallet_address, hash }, thunkAPI) => {
    const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

    try {
      await axios.post(
        `${API_URL}/api/deposit/${id_tg}/create`,
        {
          network: "TON",
          amount: amount,
          wallet_address: wallet_address,
          hash: hash,
        },
        { headers: { Authorization: getAccessTokenBearer() } },
      );

      return "Deposit successful";
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Deposit error");
    }
  },
);
