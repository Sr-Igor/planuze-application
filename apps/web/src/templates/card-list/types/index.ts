import { ReactNode } from "react";

import { PageKeys } from "@repo/language/types";
import { Permissions } from "@repo/redux/hooks";
import { TrashProps } from "@repo/ui";

import { IShowContextType, State } from "@/templates/show/types";
import { HookReq } from "@/types/hookReq";

export interface ICardListTemplateProps<T extends { id: string }, R extends { id: string }> {
  dataAccess: string;
  path: PageKeys;
  card: (props: ICardProps<R>) => ReactNode;
  hookReq?: HookReq<R>;
  getBodyKeys?: (data: T) => Record<string, any>;
  translate: string;
  trash?: Partial<TrashProps<R>>;
  order?: {
    titleKey: string;
  };
  useShow: () => IShowContextType<any>;
  getFilters?: (data: T) => Record<string, any>;
}

export interface ICardProps<R extends { id: string }> {
  item: Partial<R>;
  onDelete: () => void;
  local_id: string;
  updateItem: (local_id: string, item?: R) => void;
  filters?: Record<string, any>;
  bodyKeys?: Record<string, any>;
  path: PageKeys;
  translate: string;
  dataAccess: string;
  hookReq?: HookReq<R>;
  handleState: (state: Partial<State>) => void;
  useShow: () => IShowContextType<R>;
}

export interface IUseReqProps<T extends { id: string }, R extends { id: string }> {
  permissions: Permissions;
  data: T;
  setItems: React.Dispatch<React.SetStateAction<any>>;
  openTrash: boolean;
  setOpenTrash: (open: boolean) => void;
  hookReq?: HookReq<R>;
  filters?: Record<string, any>;
  setOpenOrder?: (open: boolean) => void;
}
