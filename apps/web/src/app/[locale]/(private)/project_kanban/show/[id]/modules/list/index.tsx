"use client";

import { useUserAccess } from "@repo/redux/hooks";
import { project_kanban_cycle_card } from "@repo/types";
import { AppTable } from "@repo/ui";

import { useKanbanShow } from "../../context";
import { useActions, useTable } from "./hooks";

export interface ListProps {
  open: boolean;
}

export const List = ({ open }: ListProps) => {
  const { permissions } = useUserAccess();
  const perm = permissions("project_kanban_cycle_card");

  const { state, params, setParams, callers, loadings } = useKanbanShow();

  const { columns } = useTable();
  const { actions: actionsTable } = useActions();

  const index = callers.card.onIndex();
  const data = index?.data || [];

  return (
    <div className="p-6 md:p-6">
      <AppTable<project_kanban_cycle_card>
        data={data}
        columns={columns}
        filters={{
          ...params,
          page: params.page || 1,
          limit: params.limit || 20,
          pages: index?.pages || 0,
          count: index?.count || 0,
          orderKey: params.orderKey || "",
          orderValue: params.orderValue as "asc" | "desc" | "",
        }}
        actions={actionsTable || []}
        loading={loadings.card.index}
        state={{
          selectedItems: [],
          loadingItems: [],
          expandedItems: [],
        }}
        events={{
          onFiltersChange: setParams,
          onSelectionChange: () => {},
          onRowClick: (item) => {
            if (!perm.show) return;
            state.card.update({ columnId: item.project_kanban_cycle_column_id, card: item });
          },
        }}
        height={!open ? "calc(100vh - 330px)" : "calc(100vh - 460px)"}
      />
    </div>
  );
};
