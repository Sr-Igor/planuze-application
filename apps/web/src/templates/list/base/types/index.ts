import { DefaultValues } from "react-hook-form";

import { HookReq, Requests } from "@repo/api";
import { Field, IUseFormListReturn, IValidatorRequest } from "@repo/form";
import { PaginationParams } from "@repo/hooks";
import { PageKeys } from "@repo/language/types";
import { Permissions } from "@repo/redux/hooks";
import { ILogsComparison, TableAction, TableColumn, TableEventHandlers } from "@repo/ui";

export interface IUseHookProps<T extends { id: string }> {
  state: State<T>;
  handleState: (obj: Partial<State<T>>) => void;
  requests: Requests<T>;
  disabled?: boolean;
}

export interface ISingleTemplateProps<T extends { id: string }> {
  path: PageKeys;
  hookReq: HookReq<T>;
  useTable: (props: IUseHookProps<T>) => {
    columns: TableColumn<T>[];
    disabledCheckbox?: (item: T) => boolean;
  };
  useActions: (props: IUseHookProps<T>) => {
    actions: TableAction<T>[];
  };
  events?: Partial<TableEventHandlers<T>>;
  trashUrl?: string;
  redirect?: string;
  showLogs?: boolean;
  hideCheckbox?: boolean;
  isTrash?: boolean;
  logs?: Omit<ILogsComparison<T>, "logs">;
  titlePage?: React.ReactNode;
  headerRightLeft?: React.ReactNode;
  headerRightRight?: React.ReactNode;
  customHeaderRight?: React.ReactNode;
  rootClassName?: string;
  customFilters?: Record<string, any>;
  useForm?: (props: IUseHookProps<T>) => IUseFormListReturn<Partial<T>> & {
    config: {
      schema: IValidatorRequest;
      fields: Field<T>[];
      defaultValues?: DefaultValues<T>;
      typeOptions?: { label: string; value: string }[];
    };
  };
  state?: State<T>;
  setState?: React.Dispatch<React.SetStateAction<State<T>>>;
}

export type Mode = "new" | "edit" | "destroy" | "destroyMany" | "restore" | "restoreMany" | "logs";

export interface State<T> {
  filters: PaginationParams;
  open?: boolean;
  mode: string | Mode;
  selected: string[];
  item?: T;
  loadingLines: string[];
}

export interface IUseReqProps<T> {
  state: State<T>;
  handleState: (obj: Partial<State<T>>) => void;
  hookReq: HookReq<T>;
  isTrash?: boolean;
  customFilters?: Record<string, any>;
}

export interface IUsePageProps<T> {
  index: any;
  state: State<T>;
  handleState: (obj: Partial<State<T>>) => void;
}

export interface IDialogProps<T extends { id: string }> {
  modalTitle?: string;
  modalDescription?: string;
  state: State<T>;
  handleState: (obj: Partial<State<T>>) => void;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  loading?: boolean;
  onSubmit: (data: Partial<T>) => void;
  useForm: ISingleTemplateProps<T>["useForm"];
  requests: Requests<T>;
  permissions: Permissions;
}
