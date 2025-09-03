export interface LevelInfo {
  level: number;
  price: string;
  percent: number;
}

export interface LevelUpgradeResult {
  updatedLevels: LevelInfo[];
  newLevel: number;
  newBalance: number;
}
