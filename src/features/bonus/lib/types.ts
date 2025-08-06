export interface Tasks {
  id: number;
  status: string;
  url: string;
  title?: string;
  reward?: string;
  imageUrl?: string;
  reward_issued?: boolean;
}
