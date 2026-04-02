export type LogType = "log" | "info" | "warning" | "error";

export type LogStat = Record<LogType, number> & {hour: number};