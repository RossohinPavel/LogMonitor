import { useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { findAll } from "../../api/functional/res";
import type { IConnection } from "../../api/IConnection";
import { useQuery } from "@tanstack/react-query";
import { AppContext } from "./context";
import { env } from "../../config";


export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  
  const connection = useRef({
    host: env.backendUrl,
  } as IConnection);

  // Запросы выполняться 1 раз.
  const { data: resources, isLoading } = useQuery({
    queryKey: ["resources"],
    queryFn: () => findAll(connection.current),
    select: (resources) => Object.fromEntries(resources.map(v => [v.slug, v])),
    staleTime: Infinity, 
    gcTime: Infinity, 
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false, 
  });

  const value = useMemo(() => {
    return { connection, resources, isLoading };
  }, [connection, resources, isLoading]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};