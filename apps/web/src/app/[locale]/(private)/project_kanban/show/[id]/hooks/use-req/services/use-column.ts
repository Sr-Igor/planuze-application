import { useProjectKanbanCycleColumn } from "@repo/api/web";
import { project_kanban } from "@repo/types";

import { useAccess } from "@/hooks/access";

import { State } from "../../../types";

export interface IUseColumnProps {
  state: State;
  cycleId?: string;
  onSuccess: () => void;
  kanban?: project_kanban;
}

export const useColumn = ({ state, cycleId, onSuccess, kanban }: IUseColumnProps) => {
  const { permissions } = useAccess();
  const perm = permissions("project_kanban_cycle");

  const requests = useProjectKanbanCycleColumn({
    id: state?.column?.id,
    enableTrash: state.type === "column" && state.modes?.includes("trash") && perm.trash,
    filters: {
      project_kanban_id: kanban?.id,
      project_kanban_cycle_id: cycleId,
    },
    callbacks: {
      store: { onSuccess },
      update: { onSuccess },
      destroy: { onSuccess },
      many: {
        onSuccess: (data) => {
          // Callback global para many de colunas, executado após cada atualização de ordenação
          // Os callbacks individuais são gerenciados em board-update.ts
          if (typeof window !== "undefined" && (window as any).__columnManyCallbacks) {
            const dataArray = Array.isArray(data) ? data : [data];
            const firstItem = dataArray[0];
            const columnId = firstItem && "id" in firstItem ? firstItem.id : null;

            if (columnId && (window as any).__columnManyCallbacks[columnId]) {
              // Executa o callback específico da coluna
              (window as any).__columnManyCallbacks[columnId].onSuccess(dataArray);
              // Remove o callback após execução
              delete (window as any).__columnManyCallbacks[columnId];
            } else if ((window as any).__columnManyCallbacks["columns"]) {
              // Executa o callback geral de colunas (usado para ordenação múltipla)
              (window as any).__columnManyCallbacks["columns"].onSuccess(dataArray);
              delete (window as any).__columnManyCallbacks["columns"];
            }
          }
          onSuccess();
        },
        onError: () => {
          // Callback global para many de colunas em caso de erro
          if (typeof window !== "undefined" && (window as any).__columnManyCallbacks) {
            // Em caso de erro, executar todos os callbacks pendentes
            const callbacks = (window as any).__columnManyCallbacks;
            Object.keys(callbacks).forEach((columnId) => {
              callbacks[columnId]?.onError?.();
            });
            // Limpa todos os callbacks
            (window as any).__columnManyCallbacks = {};
          }
        },
      },
      restore: { onSuccess },
    },
  });

  return requests;
};
