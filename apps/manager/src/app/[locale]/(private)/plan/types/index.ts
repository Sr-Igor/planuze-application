import { plan } from "@repo/types";

import { PaginationParams } from "@/types/pagination";

export interface State {
  filters: PaginationParams;
  open?: boolean;
  mode: "destroy" | "restore";
  selected: string[];
  item?: plan;
  loadingLines: string[];
}

export interface IUseReqProps {
  state: State;
  handleState: (obj: Partial<State>) => void;
}

export interface IUseTableProps {
  handleState: (obj: Partial<State>) => void;
  loadingLines: string[];
}

export interface IUsePageProps {
  index: any;
  state: State;
  baseFilters: Partial<State["filters"]>;
  handleState: (obj: Partial<State>) => void;
}
