import { feature } from "@repo/types";
import { PaginationParams } from "@repo/types/pagination";

export interface State {
  filters: PaginationParams;
  open?: boolean;
  mode: "new" | "edit";
  item?: feature;
}

export interface IUseReqProps {
  state: State;
  handleState: (obj: Partial<State>) => void;
}

export interface IUseTableProps {
  handleState: (obj: Partial<State>) => void;
}

export interface IUsePageProps {
  index: any;
  state: State;
  baseFilters: Partial<State["filters"]>;
  handleState: (obj: Partial<State>) => void;
}
