import { useRef } from "react";
import type { IConnection } from "@nestia/fetcher";
import { useMutation } from "@tanstack/react-query";
import { ping } from "../../api/functional";
import { env } from "../../config";


export const PingBackendButton = () => {
  const connectionRef = useRef<IConnection>({
    host: env.backendUrl,
  });

  const mutation = useMutation({
    mutationFn: () => ping(connectionRef.current).then(v => alert(v)),
  });

  return (
    <button
      className="counter"
      onClick={() => mutation.mutate()}
    >
      PingBackend
    </button>
  );
};