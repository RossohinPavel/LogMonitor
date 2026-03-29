import { tags } from "typia";


export interface CreateResourceDto {
  name: string & tags.MinLength<1>
}

export interface ResourceDto {
  id: number,
  name: string,
  slug: string,
  url: string | null
}
