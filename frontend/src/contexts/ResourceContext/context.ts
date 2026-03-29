import React from "react";
import type { IResourceContext } from "./types";


export const ResourceContext = React.createContext<IResourceContext | undefined>(undefined);

export const useResourceContext = () => {
  const context = React.useContext(ResourceContext);
  if (!context) {
    throw new Error("Use App context within provider!");
  }
  return context;
};