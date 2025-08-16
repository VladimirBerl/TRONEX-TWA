import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface DepositPayload {
  id_tg: string;
  amount: string;
  wallet_address: string;
}

export const deposit = createAsyncThunk<string, DepositPayload>(
  "deposit/deposit",
  async ({ id_tg, amount, wallet_address }, thunkAPI) => {
    const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

    try {
      await axios.post(`${API_URL}/api/deposit/${id_tg}/create`, {
        network: "TON",
        amount: amount,
        wallet_address: wallet_address,
      });

      return "Deposit successful";
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Deposit error");
    }
  },
);
