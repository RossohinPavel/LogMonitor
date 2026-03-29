import type { tags } from "typia";

import type { LogStat } from "./LogStat";

export type LogStatDto = {
  resource: string;
  time: string & tags.Format<"date-time">;
  result: LogStat[];
};
