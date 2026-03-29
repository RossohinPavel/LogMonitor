import type { tags } from "typia";

export type CreateResourceDto = {
  name: string & tags.MinLength<1>;
};
