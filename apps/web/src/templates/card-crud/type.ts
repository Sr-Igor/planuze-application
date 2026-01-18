import { ReactNode } from "react";

import { IValidatorRequest } from "@deviobr/validator";
import { DefaultValues } from "react-hook-form";

import { PageKeys } from "@repo/language/types";
import { ILogsComparison, TrashProps } from "@repo/ui-new";

import { Permissions } from "@/hooks/access/types";
import { Field, IUseFormListReturn } from "@repo/form";
import { HookReq } from "@/types/hookReq";
import { Shallow } from "@/types/shallowType";

export type GenericItem<T> = T & { id: string; [key: string]: any };

export interface State<T> {
  open?: boolean;
  mode?: "store" | "update" | "logs" | "trash";
  loading?: boolean;
  item?: GenericItem<T>;
}

export interface IUseHookProps<T> {
  data: any;
  indexData: any;
  disabled?: boolean;
  state: State<GenericItem<T>>;
}

export interface IFormDialogProps<T>
  extends Pick<ICardCrudProps<GenericItem<T>>, "useForm" | "page" | "translate"> {
  open?: boolean;
  setOpen: (state: Partial<State<GenericItem<T>>>) => void;
  onSubmit: (data: GenericItem<T>) => void;
  loading: boolean;
  data: any;
  indexData: any;
  state: State<GenericItem<T>>;
}

export interface IHeaderProps<T>
  extends Pick<ICardCrudProps<GenericItem<T>>, "page" | "translate" | "pathKey"> {
  state: State<GenericItem<T>>;
  handleState: (state: Partial<State<GenericItem<T>>>) => void;
}

export interface ICardProps<T>
  extends Pick<ICardCrudProps<GenericItem<T>>, "page" | "translate" | "pathKey" | "hideActions"> {
  item: GenericItem<T>;
  loading: boolean;
  onShow: (item: GenericItem<T>) => void;
  onLogs: (item: GenericItem<T>) => void;
  onDestroy: () => void;
  handleState: (state: Partial<State<GenericItem<T>>>) => void;
  icon?: string;
  title: (item: GenericItem<T>) => ReactNode;
  descriptions: (item: GenericItem<T>) => (string | null | undefined | boolean)[];
  showLoading: boolean;
  logsLoading: boolean;
  destroyLoading: boolean;
  disabled: boolean;
  hasShow: boolean;
}

export interface ILogsProps<T> extends Pick<ICardCrudProps<GenericItem<T>>, "logs"> {
  state: State<GenericItem<T>>;
  handleState: (state: Partial<State<GenericItem<T>>>) => void;
}

export interface ITrashProps<T> extends Pick<ICardCrudProps<GenericItem<T>>, "trash" | "pathKey"> {
  state: State<GenericItem<T>>;
  handleState: (state: Partial<State<GenericItem<T>>>) => void;
  data: T[];
  getPermissions: (key: string) => Permissions;
  loading: boolean;
  onRestore: (item: GenericItem<T>) => void;
}

export interface IUseReqProps<T>
  extends Pick<ICardCrudProps<GenericItem<T>>, "hookReq" | "pathKey"> {
  data?: GenericItem<T>;
  state: State<GenericItem<T>>;
  filters?: Record<string, any>;
  handleState: (state: Partial<State<GenericItem<T>>>) => void;
  getPermissions: (key: string) => Permissions;
  externalData?: T[];
}

export interface ICardCrudProps<T> {
  hookReq: HookReq<T>;
  pathKey: string;
  externalData?: T[];
  page: PageKeys;
  translate: string;
  getBodyKeys?: (data?: T) => Record<string, any>;
  getFilters?: (data?: T) => Record<string, any>;
  useForm: (props: IUseHookProps<GenericItem<T>>) => IUseFormListReturn<GenericItem<T>> & {
    config?: {
      schema: IValidatorRequest;
      fields: Field<Shallow<T>>[];
      defaultValues?: DefaultValues<GenericItem<T>>;
    };
  };
  card: Pick<ICardProps<T>, "icon" | "title" | "descriptions">;
  logs?: Omit<Partial<ILogsComparison<GenericItem<T>>>, "logs">;
  trash?: Partial<TrashProps<GenericItem<T>>>;
  hideActions?: {
    update?: boolean;
    destroy?: boolean;
    logs?: boolean;
  };
}
