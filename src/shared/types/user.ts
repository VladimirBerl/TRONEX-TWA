import { ReferralsInfo } from "@/shared/types/referral.ts";

export interface User {
  id_tg: string | null;
  farm_balance: string;
  clicks_today: number;
  level: number;
  investment_balance: string;
  wallet_address: string | null;
  status: string;
  username: string | null;
}

export interface AuthData {
  token: string;
  user: User;
}

export interface FarmClickData {
  farm_balance: string;
  clicks_today: number;
  reward_added: number;
}

export interface UserState extends User {
  reward_added: number;
  referrals: ReferralsInfo | null;

  token: string;
}

export interface UpdateWalletData extends User {
  data: User;
}
