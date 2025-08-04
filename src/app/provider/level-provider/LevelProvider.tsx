import * as React from "react";
import { useState } from "react";

interface LevelContextType {
  level: number;
  setLevel: React.Dispatch<React.SetStateAction<number>>;
}

interface LevelProviderProps {
  children: React.ReactNode;
}

export const LevelContext = React.createContext<LevelContextType | undefined>(undefined);

export const LevelProvider: React.FC<LevelProviderProps> = ({ children }) => {
  const [level, setLevel] = useState<number>(0);

  return <LevelContext.Provider value={{ level, setLevel }}>{children}</LevelContext.Provider>;
};
