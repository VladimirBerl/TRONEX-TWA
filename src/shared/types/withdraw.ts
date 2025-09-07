export interface WithdrawInfo {
  id: number;
  network: string;
  amount: string;
  status: string;
  createdAt: string;
}

export interface WithdrawData extends WithdrawInfo {
  page: number;
  total: number;
  withdrawals: WithdrawInfo[];
}
