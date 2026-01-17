import {
  InfiniteData,
  QueryClient,
  UseInfiniteQueryResult,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";

import {
  project_allocation,
  project_config,
  project_kanban,
  project_kanban_cycle,
  project_kanban_cycle_allocation,
  project_kanban_cycle_card,
  project_kanban_cycle_card_type,
  project_kanban_cycle_column,
  project_member,
  project_tool,
} from "@repo/types";

import { IIndexResponseDTO } from "@repo/api/web/callers/project_kanban_report/types";
import {
  BoardUpdateProps,
  IProfile,
} from "@/app/[locale]/(private)/project_kanban/show/[id]/types";
import { Pagination } from "@/types/pagination";

import { Mode, State } from "../../../types";
import { IParams } from "../../use-query/types";
import { ISelectReturnProps } from "../../use-select/types";

//-------------------- USE DATA --------------------//
export interface IUseDataProps {
  services: Services;
  params: IParams;
  cycleId?: string;
  kanban?: project_kanban;
}

export interface IUseDataReturnProps {
  cards: project_kanban_cycle_card[];
  cardsTypes: project_kanban_cycle_card_type[];
  members: project_member[];
  tools: project_tool[];
  configs: project_config[];
  allocations: project_kanban_cycle_allocation[];
  globalAllocations: project_allocation[];
  visibleCards: {
    project_kanban_cycle_card_type_id: string[];
    title: string[];
    profile_id: string[];
    work_type_id: string[];
    public_id: string[];
    description: string[];
    tag: string[];
    project_kanban_objective_id: string[];
    end_date_estimate: {
      start?: string;
      end?: string;
    };
    end_date_execute: {
      start?: string;
      end?: string;
    };
    createdAt: {
      start?: string;
      end?: string;
    };
    severity: {
      min?: string;
      max?: string;
    };
    priority: {
      min?: string;
      max?: string;
    };
    estimate: {
      min?: string;
      max?: string;
    };
    execute: {
      min?: string;
      max?: string;
    };
    work_in_progress: {
      min?: string;
      max?: string;
    };
  };
  allProfiles: IProfile[];
  profiles: IProfile[];
  cycles: project_kanban_cycle[];
}

//-------------------- USE EFFECTS --------------------//
export interface IUseEffectsProps {
  cycleServices: any;
  isLocalUpdate: boolean;
  setCycle: (cycle: any) => void;
  params: IParams;
  setState: (state: Partial<State>) => void;
}

//-------------------- USE LOADING --------------------//
export interface IUseLoadingProps {
  services: Services;
  kanbanShow: UseQueryResult<project_kanban | undefined, Error>;
}

export interface LoadingProps {
  index: boolean;
  show: boolean;
  action: boolean;
  destroy: boolean;
  many: boolean;
  trash: boolean;
  restore: boolean;
}

export interface IUseLoadingReturnProps {
  config: LoadingProps;
  cycle: LoadingProps;
  column: LoadingProps;
  card: LoadingProps;
  cardType: LoadingProps;
  member: LoadingProps;
  allocation: LoadingProps;
  globalAllocation: LoadingProps;
  tool: LoadingProps;
  kanban: LoadingProps;
  report: LoadingProps & { exported: boolean };
  destroy: boolean;
}

//-------------------- USE PAGE --------------------//
export interface IUsePageProps {
  handleClose: (modes: Mode[]) => void;
  params: IParams;
  setParams: (params: IParams) => void;
}

export interface IUsePageReturnProps {
  id: string;
  show: UseQueryResult<project_kanban | undefined, Error>;
  cycle?: project_kanban_cycle | null;
  search: string;
  kanban: project_kanban | undefined;
  cycleId?: string;
  queryClient: QueryClient;
  activeCycle: project_kanban_cycle | undefined;
  isLocalUpdate: boolean;
  isCreatingLCard: boolean;
  setCycle: (cycle: project_kanban_cycle | undefined) => void;
  setSearch: (search: string) => void;
  onSuccess: () => void;
  setIsLocalUpdate: (isLocalUpdate: boolean) => void;
  setIsCreatingLCard: (isCreatingLCard: boolean) => void;
}

//-------------------- USE REQ --------------------//
export interface IUseReqProps {
  state: State;
  setState: (state: State) => void;
  handleClose: (modes: Mode[]) => void;
  params: IParams;
  setParams: (params: IParams) => void;
}

export interface IUseReqReturnProps {
  page: IUsePageReturnProps;
  data: IUseDataReturnProps;
  services: Services;
  loadings: IUseLoadingReturnProps;
  destroy: (data: any) => void;
  updateBoard: (props: BoardUpdateProps) => void;
}

//-------------------- USE SELECT --------------------//
export interface IUseSelectProps {
  params: IParams;
  setParams: (params: IParams) => void;
  kanban?: project_kanban | null;
}

export type Selects = "profile" | "workType" | "objective" | "version";

export interface IUseSelectReturnProps {
  profile: ISelectReturnProps;
  workType: ISelectReturnProps;
  objective: ISelectReturnProps;
  version: ISelectReturnProps;
  handleSearch: (select: Selects, value?: string | null) => void;
  search: Record<Selects, string | undefined | null>;
}

//-------------------- Services --------------------//
export interface Services {
  cycle: {
    show: UseQueryResult<project_kanban_cycle, Error>;
    update: UseMutationResult<
      project_kanban_cycle | Pagination<project_kanban_cycle>,
      Error,
      { id: string; body: Partial<project_kanban_cycle> }
    >;
    store: UseMutationResult<
      project_kanban_cycle | Pagination<project_kanban_cycle>,
      Error,
      Partial<project_kanban_cycle>
    >;
    destroy: UseMutationResult<
      project_kanban_cycle | Pagination<project_kanban_cycle>,
      Error,
      { id: string; query: Partial<project_kanban_cycle> }
    >;
    many: UseMutationResult<project_kanban_cycle[] | Pagination<project_kanban_cycle>, Error, any>;
    trash: UseQueryResult<Pagination<project_kanban_cycle>, Error>;
    restore: UseMutationResult<
      project_kanban_cycle | Pagination<project_kanban_cycle>,
      Error,
      { id: string }
    >;
  };
  column: {
    update: UseMutationResult<
      project_kanban_cycle_column | Pagination<project_kanban_cycle_column>,
      Error,
      Partial<project_kanban_cycle_column>
    >;
    store: UseMutationResult<
      project_kanban_cycle_column | Pagination<project_kanban_cycle_column>,
      Error,
      Partial<project_kanban_cycle_column>
    >;
    destroy: UseMutationResult<
      project_kanban_cycle_column | Pagination<project_kanban_cycle_column>,
      Error,
      { id: string; query: Partial<project_kanban_cycle_column> }
    >;
    many: UseMutationResult<
      project_kanban_cycle_column[] | Pagination<project_kanban_cycle_column>,
      Error,
      any
    >;
    trash: UseQueryResult<Pagination<project_kanban_cycle_column>, Error>;
    restore: UseMutationResult<
      project_kanban_cycle_column | Pagination<project_kanban_cycle_column>,
      Error,
      string
    >;
  };
  allocation: {
    index: UseQueryResult<Pagination<project_kanban_cycle_allocation>, Error>;
    update: UseMutationResult<
      project_kanban_cycle_allocation | Pagination<project_kanban_cycle_allocation>,
      Error,
      Partial<project_kanban_cycle_allocation>
    >;
    store: UseMutationResult<
      project_kanban_cycle_allocation | Pagination<project_kanban_cycle_allocation>,
      Error,
      Partial<project_kanban_cycle_allocation>
    >;
    destroy: UseMutationResult<any | Pagination<project_kanban_cycle_allocation>, Error, void>;
    trash: UseQueryResult<Pagination<project_kanban_cycle_allocation>, Error>;
    restore: UseMutationResult<
      project_kanban_cycle_allocation | Pagination<project_kanban_cycle_allocation>,
      Error,
      string
    >;
  };
  card: {
    quickIndex: UseQueryResult<Pagination<project_kanban_cycle_card>, Error>;
    index: UseQueryResult<Pagination<project_kanban_cycle_card>, Error>;
    show: UseQueryResult<project_kanban_cycle_card, Error>;
    update: UseMutationResult<
      project_kanban_cycle_card | Pagination<project_kanban_cycle_card>,
      Error,
      Partial<project_kanban_cycle_card>
    >;
    store: UseMutationResult<
      project_kanban_cycle_card | Pagination<project_kanban_cycle_card>,
      Error,
      Partial<project_kanban_cycle_card>
    >;
    destroy: UseMutationResult<
      project_kanban_cycle_card | Pagination<project_kanban_cycle_card>,
      Error,
      { id: string; query: Partial<project_kanban_cycle_card> }
    >;
    many: UseMutationResult<
      project_kanban_cycle_card | Pagination<project_kanban_cycle_card>,
      Error,
      any
    >;
    trash: UseInfiniteQueryResult<
      InfiniteData<Pagination<project_kanban_cycle_card>, unknown>,
      Error
    >;
    restore: UseMutationResult<
      project_kanban_cycle_card | Pagination<project_kanban_cycle_card>,
      Error,
      Partial<project_kanban_cycle_card>
    >;
  };
  cardType: {
    index: UseQueryResult<Pagination<project_kanban_cycle_card_type>, Error>;
    update: UseMutationResult<
      project_kanban_cycle_card_type | Pagination<project_kanban_cycle_card_type>,
      Error,
      Partial<project_kanban_cycle_card_type>
    >;
    store: UseMutationResult<
      project_kanban_cycle_card_type | Pagination<project_kanban_cycle_card_type>,
      Error,
      Partial<project_kanban_cycle_card_type>
    >;
    destroy: UseMutationResult<
      project_kanban_cycle_card_type | Pagination<project_kanban_cycle_card_type>,
      Error,
      { id: string; query: Partial<project_kanban_cycle_card_type> }
    >;
    trash: UseQueryResult<Pagination<project_kanban_cycle_card_type>, Error>;
    restore: UseMutationResult<
      project_kanban_cycle_card_type | Pagination<project_kanban_cycle_card_type>,
      Error,
      string
    >;
  };
  member: {
    index: UseQueryResult<Pagination<project_member>, Error>;
    store: UseMutationResult<
      project_member | Pagination<project_member>,
      Error,
      Partial<project_member>
    >;
    destroy: UseMutationResult<project_member | Pagination<project_member>, Error, void>;
    trash: UseQueryResult<Pagination<project_member>, Error>;
    restore: UseMutationResult<
      project_member | Pagination<project_member>,
      Error,
      string | undefined
    >;
  };
  report: {
    index: UseQueryResult<IIndexResponseDTO, Error>;
    exported: UseMutationResult<any, Error, any>;
  };
  config: {
    index: UseQueryResult<Pagination<project_config>, Error>;
    store: UseMutationResult<
      project_config | Pagination<project_config>,
      Error,
      Partial<project_config>
    >;
    update: UseMutationResult<
      project_config | Pagination<project_config>,
      Error,
      Partial<project_config>
    >;
    destroy: UseMutationResult<project_config | Pagination<project_config>, Error, void>;
    trash: UseQueryResult<Pagination<project_config>, Error>;
    restore: UseMutationResult<
      project_config | Pagination<project_config>,
      Error,
      string | undefined
    >;
  };
  globalAllocation: {
    index: UseQueryResult<Pagination<project_allocation>, Error>;
    store: UseMutationResult<
      project_allocation | Pagination<project_allocation>,
      Error,
      Partial<project_allocation>
    >;
    update: UseMutationResult<
      project_allocation | Pagination<project_allocation>,
      Error,
      Partial<project_allocation>
    >;
    destroy: UseMutationResult<project_allocation | Pagination<project_allocation>, Error, void>;
    trash: UseQueryResult<Pagination<project_allocation>, Error>;
    restore: UseMutationResult<
      project_allocation | Pagination<project_allocation>,
      Error,
      string | undefined
    >;
  };
  tool: {
    index: UseQueryResult<Pagination<project_tool>, Error>;
    store: UseMutationResult<project_tool | Pagination<project_tool>, Error, Partial<project_tool>>;
    update: UseMutationResult<
      project_tool | Pagination<project_tool>,
      Error,
      Partial<project_tool>
    >;
    destroy: UseMutationResult<project_tool | Pagination<project_tool>, Error, void>;
    trash: UseQueryResult<Pagination<project_tool>, Error>;
    restore: UseMutationResult<project_tool | Pagination<project_tool>, Error, string | undefined>;
  };
}
