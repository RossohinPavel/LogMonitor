import { useMemo, useState } from "react";
import { ResourceContext } from "./context";
import type { props, ViewType } from "./types";


export const ResourceContextProvider = ({ resource, children }: props) => {

  const [view, setView] = useState<ViewType>('index');
  
  const value = useMemo(() => ({resource, view, setView}), [resource, view]);

  return (
    <ResourceContext.Provider value={value}>
      {children}
    </ResourceContext.Provider>
  );
}