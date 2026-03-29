import type { JsonObject } from "./JsonObject";

export type IncomingLogDto = {
  type: "error" | "warning" | "info" | "success";
  content:
    | null
    | string
    | number
    | boolean
    | (null | string | number | boolean | JsonObject)[]
    | JsonObject;
};
