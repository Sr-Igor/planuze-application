import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { profile } from "@repo/api/generator/types";
import { PageKeys } from "@repo/language/types";

import { IUseCallerProps } from "@/api/types";
import { AccessView, Permissions } from "@/hooks/access/types";

export interface IShowTab {
  title: string;
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  invisible?: boolean;
  loading?: boolean;
}

export interface State {
  tab: string;
  action?: string;
  dirty?: boolean;
  loading?: boolean;
  disabled?: boolean;
  cancel?: boolean;
  delete?: boolean;
}

export interface IShowContextType<T> {
  data?: T;
  state: State;
  handleState: (obj: Partial<State>) => void;
  permissions: Permissions;
  getPermissions: (key: string) => Permissions;
  profile?: profile;
  userView: AccessView;
  companyView: AccessView;
  access: AccessView;
}

export interface TabsProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  isDirty: boolean;
  hasData: boolean;
  loading?: boolean;
  hideTabs?: boolean;
  tabs: Array<{
    title: string;
    value: string;
    disabled?: boolean;
    children: React.ReactNode;
  }>;
}

export interface DeleteProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
  title: string;
  description: string;
  confirmText: string;
}

export interface CancelProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  confirmText: string;
}

export type Requests<T> = {
  show?: UseQueryResult<any, any>;
  destroy?: UseMutationResult<any, any, any, any>;
};

export type HookReq<T> = (params: IUseCallerProps<T>) => Requests<T>;

export interface IShowTemplateProps<T extends { id: string }> {
  useTabs: (props: IShowHookProps<T>) => IShowTab[];
  path: PageKeys;
  pageKey?: string | null;
  id?: string;
  data?: T;
  hookReq?: HookReq<T>;
  defaultTab: string;
  baseUrl?: string;
  rootClassName?: string;
  hideTabs?: boolean;
  hideQueryParams?: boolean;
  customHeader?: (data: T, permissions: (key: string) => Permissions) => React.ReactNode;
  undeletableProps?: (
    data: T,
    profile: profile | undefined,
    translate: (key: string) => string
  ) =>
    | {
        title: string;
        description?: string;
        icon?: string;
        className?: string;
      }
    | null
    | undefined;
}

export interface IUseHookProps<T extends { id: string }> {
  hookReq?: HookReq<T>;
  id: string;
  defaultTab: string;
  baseUrl?: string;
  pageKey?: string;
  data?: T;
  setParams?: (updates: Record<string, any>) => void;
  path?: string;
}

export interface IShowHookProps<T extends { id: string }> {
  disabled?: boolean;
  loading?: boolean;
  invisible?: boolean;
  data?: T;
  getPermissions: (key: string) => Permissions;
}

export interface IHeaderProps<T> {
  id: string;
  isLoading: boolean;
  onDelete: () => void;
  isDeleting: boolean;
  customHeader?: React.ReactNode;
  title: string;
  description: string;
  undeletable?: {
    title: string;
    description?: string;
    icon?: string;
    className?: string;
  } | null;
}

export interface IDeleteProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
  title: string;
  description: string;
  confirmText: string;
}
