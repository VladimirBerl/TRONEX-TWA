import { useState } from "react";
import { useGetLevelsQuery, useUpgradeLevelMutation } from "@/shared/api/api.ts";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store.ts";
import { LevelInfo } from "@/shared/types/levels.ts";
import { useAppDispatch } from "@/shared/hooks";
import { setNewLevel } from "@/entities/user/model/userSlice.ts";

export const useUpgradeLevel = () => {
  const [isBalanceInsufficient, setIsBalanceInsufficient] = useState(false);
  const { level, id_tg, investment_balance } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const { data: levels } = useGetLevelsQuery(id_tg!);
  const [upgradeLevel] = useUpgradeLevelMutation();

  const handleUpgradeLevel = () => {
    const price: number = Math.round(parseFloat(levels?.[0].price ?? "0"));

    if (id_tg != null && levels != null) {
      upgradeLevel(id_tg)
        .unwrap()
        .then(() => {
          const updatedLevels: LevelInfo[] = levels.slice(1);

          const newLevel = level + 1;
          const newBalance = (parseFloat(investment_balance) - price).toString();

          dispatch(setNewLevel({ newLevel, newBalance }));

          return {
            updatedLevels,
            newLevel,
            newBalance,
          };
        })
        .catch((error) => {
          setIsBalanceInsufficient(true);
          console.error(error);
        });
      setIsBalanceInsufficient(false);
    }
  };

  return {
    levels,
    handleUpgradeLevel,
    isBalanceInsufficient,
  };
};
