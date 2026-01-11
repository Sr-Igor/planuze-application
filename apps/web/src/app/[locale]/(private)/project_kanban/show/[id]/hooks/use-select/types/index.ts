import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";

import { project_kanban } from "@repo/api/generator/types";

import { Pagination } from "@/types/pagination";

export type ISelectReturnProps = UseInfiniteQueryResult<
  InfiniteData<Pagination<any>, unknown>,
  Error
>;

export type ISelectProps = {
  search?: string | null;
  kanban?: project_kanban | null;
};
