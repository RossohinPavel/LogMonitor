import { LogStat, LogType } from "../drizzle/drizzle.types";

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