import { InfiniteData, UseInfiniteQueryResult } from "@tanstack/react-query";

import { Pagination, project_kanban } from "@repo/types";

export type ISelectReturnProps = UseInfiniteQueryResult<
  InfiniteData<Pagination<any>, unknown>,
  Error
>;

export type ISelectProps = {
  search?: string | null;
  kanban?: project_kanban | null;
};
