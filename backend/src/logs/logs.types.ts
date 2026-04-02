import { LogStat } from "../drizzle/drizzle.schema";


export type LogType = "log" | "info" | "warning" | "error";

type JsonPrimitives = string | number | boolean | null;
type JsonObject = Record<string, unknown>;
type JsonArray = Array<JsonPrimitives | JsonObject>;

type ValidJsonTypes = JsonPrimitives | JsonObject | JsonArray;

export interface IncomingLogDto {
  type: LogType,
  content: ValidJsonTypes
}

export interface LogStatDto {
  resource: string
  time: Date
  result: LogStat[]
}