import type { create } from "../../api/functional/res";
import type { IConnection } from "../../api/IConnection";


export type ResourcesType = Record<string, create.Output>;

export interface IAppContext {
  connection: React.RefObject<IConnection>
  resources: ResourcesType | undefined,
  isLoading: boolean
}