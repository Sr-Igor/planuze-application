import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";
import { LucideIcon } from "lucide-react";

import {
  project_allocation,
  project_config,
  project_kanban_cycle,
  project_kanban_cycle_allocation,
  project_kanban_cycle_card,
  project_kanban_cycle_card_type,
  project_kanban_cycle_column,
  project_member,
  project_tool,
} from "@repo/api/generator/types";

import { IIndexResponseDTO } from "@/api/callers/project_kanban_report/types";
import { Pagination } from "@/types/pagination";

import { IParams } from "../hooks/use-query/types";
import {
  IUsePageReturnProps,
  IUseReqReturnProps,
  IUseSelectReturnProps,
} from "../hooks/use-req/types";
import { OnOpenCardFormProps } from "../modules/dnd/types";

export type Mode =
  | "store"
  | "update"
  | "destroy"
  | "trash"
  | "show"
  | "logs"
  | "order"
  | "restore"
  | "move"
  | "change"
  | "new_comment"
  | "update_comment"
  | "upload";

export type Feature =
  | "cycle"
  | "column"
  | "cardType"
  | "card"
  | "logs"
  | "member"
  | "allocation"
  | "config"
  | "globalAllocation"
  | "tool";

export interface IProfile {
  avatar?: string | null;
  name?: string | null;
  id?: string | null;
  profile_member_id?: string | null;
  profile_id?: string | null;
  unit?: string | null;
  time?: number | null;
  member?: project_member | null;
  allocation?: project_kanban_cycle_allocation | null;
}

export interface Viewer {
  icon: LucideIcon;
  value: string;
  tooltip: string;
  isVisible: boolean;
}

export interface State {
  config?: project_config;
  cycle?: project_kanban_cycle;
  column?: project_kanban_cycle_column;
  cardType?: project_kanban_cycle_card_type;
  card?: project_kanban_cycle_card;
  member?: project_member;
  tool?: project_tool;
  allocation?: project_kanban_cycle_allocation;
  globalAllocation?: project_allocation;
  modes?: Mode[];
  close?: boolean;
  columnId?: string;
  type?: Feature;
  anchor?: project_kanban_cycle_card;
  inLoading?: string[];
  forcedMode?: Mode;
}

export interface BoardUpdateProps {
  board: project_kanban_cycle;
  item: project_kanban_cycle_column | project_kanban_cycle_card;
  type: "column" | "card";
  moment: "primary" | "secondary" | "order";
}

export interface IUseKanbanReturnProps {
  state: State;
  setState: (state: State) => void;
  handleState: (s: Partial<State>, resetModes?: boolean) => void;
  isOpen: (type: State["type"], modes: Mode[]) => boolean;
  handleClose: (modes: Mode[], state?: Partial<State>) => void;
  viewers: Viewer[];
}

export interface IUseCallersProps {
  req: IUseReqReturnProps;
  general: IUseKanbanReturnProps;
  page: IUsePageReturnProps;
}

export interface IUseCallersReturnProps {
  config: {
    onSubmit: (config: Partial<project_config>) => void;
    onTrash: () => Pagination<project_config> | undefined;
    onRestore: (data: project_config) => void;
  };
  column: {
    onSubmit: (column: Partial<project_kanban_cycle_column>) => void;
    onMany: (items: project_kanban_cycle_column[]) => void;
    onTrash: () => Pagination<project_kanban_cycle_column> | undefined;
    onRestore: (data: project_kanban_cycle_column) => void;
  };
  member: {
    onSubmit: (member: Partial<project_member>) => void;
    onRestore: (member: project_member) => void;
    onDelete: () => void;
    onTrash: () => Pagination<project_member> | undefined;
    onIndex: () => Pagination<project_member> | undefined;
  };
  cycle: {
    onSubmit: (cycle: Partial<project_kanban_cycle>) => void;
    onTrash: () => Pagination<project_kanban_cycle> | undefined;
    onRestore: (item: project_kanban_cycle) => void;
    onMany: (items: project_kanban_cycle[]) => void;
  };
  card: {
    onShow: () => project_kanban_cycle_card | undefined;
    onIndex: () => Pagination<project_kanban_cycle_card> | undefined;
    onSubmit: (card: Partial<project_kanban_cycle_card>, close?: boolean) => void;
    onTrash: () => UseInfiniteQueryResult<
      InfiniteData<Pagination<project_kanban_cycle_card>, unknown>,
      Error
    >;
    onRestore: (data: project_kanban_cycle_card) => void;
  };
  cardType: {
    onSubmit: (data: Partial<project_kanban_cycle_card_type>) => void;
    onTrash: () => Pagination<project_kanban_cycle_card_type> | undefined;
    onRestore: (data: project_kanban_cycle_card_type) => void;
  };
  allocation: {
    onTrash: () => Pagination<project_kanban_cycle_allocation> | undefined;
    onRestore: (data: project_kanban_cycle_allocation) => void;
    onSubmit: (data: Partial<project_kanban_cycle_allocation>) => void;
    onDelete: () => void;
  };
  globalAllocation: {
    onTrash: () => Pagination<project_allocation> | undefined;
    onRestore: (data: project_allocation) => void;
    onSubmit: (data: Partial<project_allocation>) => void;
    onDelete: () => void;
  };
  tool: {
    onTrash: () => Pagination<project_tool> | undefined;
    onRestore: (data: project_tool) => void;
    onSubmit: (data: Partial<project_tool>) => void;
    onDelete: () => void;
  };
  report: {
    onIndex: () => IIndexResponseDTO | undefined;
    onExport: () => void;
  };
  onDestroy: (data: any) => void;
}

export interface IUseActionsProps {
  state: State;
  handleState: (s: Partial<State>) => void;
}

export interface IUseStatesReturnProps {
  cycle: {
    open: () => void;
    form: (cycle?: project_kanban_cycle) => void;
    delete: (cycle: project_kanban_cycle) => void;
  };
  card: {
    trash: () => void;
    delete: (card: project_kanban_cycle_card) => void;
    store: (card: OnOpenCardFormProps) => void;
    update: (card: OnOpenCardFormProps) => void;
    restore: (card: project_kanban_cycle_card) => void;
    move: (card: project_kanban_cycle_card, close?: boolean) => void;
    change: (card: project_kanban_cycle_card, close?: boolean) => void;
  };
  cardType: {
    open: () => void;
    form: (cardType?: project_kanban_cycle_card_type) => void;
    delete: (cardType: project_kanban_cycle_card_type) => void;
  };
  column: {
    open: () => void;
    form: (column?: project_kanban_cycle_column) => void;
    delete: (column: project_kanban_cycle_column) => void;
  };
  member: {
    open: () => void;
    form: (member?: project_member) => void;
    delete: (member: project_member) => void;
    restore: (member: project_member) => void;
  };
  allocation: {
    open: () => void;
    form: (allocation?: project_kanban_cycle_allocation) => void;
    delete: (allocation: project_kanban_cycle_allocation) => void;
    restore: (allocation: project_kanban_cycle_allocation) => void;
    trash: () => void;
  };
  config: {
    open: () => void;
    form: (config?: project_config) => void;
    delete: (config: project_config) => void;
  };
  globalAllocation: {
    open: () => void;
    form: (globalAllocation?: project_allocation) => void;
    delete: (globalAllocation: project_allocation) => void;
    restore: (globalAllocation: project_allocation) => void;
    trash: () => void;
  };
  tool: {
    open: () => void;
    form: (tool?: project_tool) => void;
    delete: (tool: project_tool) => void;
    restore: (tool: project_tool) => void;
    trash: () => void;
  };
  logs: {
    open: (data: { item: any; type: Feature }) => void;
  };
}

export interface IHandleDirtyStateProps {
  modes: Mode[];
  feature: Feature;
  dirty: boolean;
}

export interface IHandleCancelStateProps {
  modes: Mode[];
  feature: Feature;
  onConfirm: () => void;
}

export interface IUseUnloadReturnProps {
  handleState: (obj: IHandleDirtyStateProps) => void;
  isDirty: boolean;
  cancel: IHandleCancelStateProps | null;
  setCancel: (obj: IHandleCancelStateProps | null) => void;
  isInDirty: (feature: Feature, modes: Mode[]) => boolean;
}

export interface IKanbanContext extends IUseReqReturnProps {
  params: IParams;
  setParams: (p: Partial<IParams>) => void;
  general: IUseKanbanReturnProps;
  state: IUseStatesReturnProps;
  callers: IUseCallersReturnProps;
  select: IUseSelectReturnProps;
  unload: IUseUnloadReturnProps;
}
