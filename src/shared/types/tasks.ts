export interface BonusTask {
  id: number;
  title: string;
  status: string;
  reward: string;
  reward_issued: boolean;
  url: string;
  imageUrl: string;
}

export interface BonusTasksData extends BonusTask {
  tasks: BonusTask[];
  page: number;
  total: number;
  status: string;
}

export interface BonusTasksRes {
  tasks: BonusTask[];
  page: number;
  total: number;
}
