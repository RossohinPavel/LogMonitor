import type { create } from "../../api/functional/res"
import type { ReactNode } from "react"


export interface props {
  resource: create.Output,
  children: ReactNode
}

export interface IResourceContext {
  resource: create.Output
  view: ViewType
  setView: (v: ViewType) => void
}

export type ViewType = 'index' | 'pings' | 'info' | 'success' | 'warnings' | 'errors';