export interface DepositInfo {
  id: number;
  network: string;
  amount: string;
  status: string;
  createdAt: string;
}

export interface DepositData {
  page: number;
  total: number;
  deposits: DepositInfo[];
}
