import React from "react";
import type { IAppContext } from "./types";


export const AppContext = React.createContext<IAppContext | undefined>(undefined);

export const useAppContext = () => {
  const context = React.useContext(AppContext);
  if (!context) {
    throw new Error("Use App context within provider!");
  }
  return context;
};