import { PaginationParams } from "@repo/hooks";
import { billing_error } from "@repo/types";

export interface State {
  filters: PaginationParams;
  open?: boolean;
  mode: "new" | "edit";
  item?: billing_error;
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
