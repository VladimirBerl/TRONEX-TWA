import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface DepositPayload {
  id_tg: string;
  amount: string;
}

export const deposit = createAsyncThunk<string, DepositPayload>(
  "deposit/deposit",
  async ({ id_tg, amount }, thunkAPI) => {
    const API_URL: string = import.meta.env.VITE_API_BASE_URL! as string;

    try {
      await axios.patch(`${API_URL}/api/deposit`, {
        id_tg: id_tg,
        amount: amount,
      });
      // TODO Доработать
      console.log("Деньги внесены на счёт");

      return "Deposit successful";
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue("Deposit error");
    }
  },
);
