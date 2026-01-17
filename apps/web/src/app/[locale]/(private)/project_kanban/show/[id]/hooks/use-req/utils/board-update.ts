import { QueryClient, UseMutationResult, UseQueryResult } from "@tanstack/react-query";

import { project_kanban_cycle, project_kanban_cycle_card } from "@repo/types";

import { BoardUpdateProps, State } from "@/app/[locale]/(private)/project_kanban/show/[id]/types";

export interface IBoardUpdateProps {
  boardProps: BoardUpdateProps;
  setIsLocalUpdate: (isLocalUpdate: boolean) => void;
  setCycle: (cycle: project_kanban_cycle) => void;
  manyColumn: UseMutationResult<any, any, any, any>;
  manyCard: UseMutationResult<any, any, any, any>;
  showCycle: UseQueryResult<project_kanban_cycle, any>;
  state: State;
  setState: (state: any) => void;
  queryClient: QueryClient;
  cycleId?: string;
}

// Controle global de requisições pendentes
const pendingCardRequests = new Set<string>();
const pendingColumnRequests = new Set<string>();

// Inicializa o objeto global de callbacks se não existir
if (typeof window !== "undefined") {
  (window as any).__cardManyCallbacks = (window as any).__cardManyCallbacks || {};
  (window as any).__columnManyCallbacks = (window as any).__columnManyCallbacks || {};
}

// Função auxiliar para verificar se todas as requisições foram concluídas
const checkAllRequestsCompleted = (setIsLocalUpdate: (value: boolean) => void) => {
  if (pendingCardRequests.size === 0 && pendingColumnRequests.size === 0) {
    setIsLocalUpdate(false);
  }
};

export const boardUpdate = ({
  boardProps,
  setIsLocalUpdate,
  setCycle,
  manyColumn,
  manyCard,
  showCycle,
  setState,
  queryClient,
  state,
  cycleId,
}: IBoardUpdateProps) => {
  const { board, item, type, moment } = boardProps;

  setIsLocalUpdate(true);
  setCycle(board);

  if (type === "column") {
    const sortedColumns =
      board.project_kanban_cycle_columns?.sort((a, b) => (a.order || 0) - (b.order || 0)) || [];

    const ids = sortedColumns.map((column) => column.id);

    const data = sortedColumns.map((column) => ({
      id: column.id,
      order: column.order,
      title: column.title,
      color: column.color,
      limit: column.limit,
      project_kanban_cycle_id: column.project_kanban_cycle_id,
    }));

    // Adiciona todas as colunas ao conjunto de requisições pendentes
    ids.forEach((columnId) => {
      pendingColumnRequests.add(columnId);
    });

    // Adiciona as colunas ao array de loading
    setState({
      inLoading: [...(state?.inLoading || []), ...ids],
    });

    // Registra o callback no objeto global
    if (typeof window !== "undefined") {
      (window as any).__columnManyCallbacks["columns"] = {
        onSuccess: () => {
          const updatedCycle = {
            ...board,
            project_kanban_cycle_columns: sortedColumns,
          };
          setCycle(updatedCycle);

          // Remove todas as colunas do conjunto de requisições pendentes
          ids.forEach((columnId) => {
            pendingColumnRequests.delete(columnId);
          });

          // Remove as colunas do array de loading
          setState((prevState: any) => ({
            ...prevState,
            inLoading: prevState?.inLoading?.filter((id: string) => !ids.includes(id)) || [],
          }));

          setTimeout(() => {
            queryClient.invalidateQueries({
              queryKey: ["project_kanban_cycle", "show", cycleId],
            });
            checkAllRequestsCompleted(setIsLocalUpdate);
          }, 500);
        },
        onError: () => {
          // Remove todas as colunas do conjunto de requisições pendentes
          ids.forEach((columnId) => {
            pendingColumnRequests.delete(columnId);
          });

          // Remove as colunas do array de loading
          setState((prevState: any) => ({
            ...prevState,
            inLoading: prevState?.inLoading?.filter((id: string) => !ids.includes(id)) || [],
          }));

          if (showCycle.data) setCycle(showCycle.data);
          checkAllRequestsCompleted(setIsLocalUpdate);
        },
      };
    }

    manyColumn.mutate({ ids, body: { data } });
  } else if (type === "card") {
    const card = item as project_kanban_cycle_card;
    const column_id = card.project_kanban_cycle_column_id;

    // Adiciona o card ao conjunto de requisições pendentes
    pendingCardRequests.add(card.id);

    setState({ card, columnId: column_id, inLoading: [...(state?.inLoading || []), card.id] });

    // Captura o ID do card atual para usar nos callbacks
    const currentCardId = card.id;

    // Registra os callbacks no objeto global
    if (typeof window !== "undefined") {
      (window as any).__cardManyCallbacks[currentCardId] = {
        onSuccess: (data: any) => {
          // Remove o card do conjunto de requisições pendentes
          pendingCardRequests.delete(currentCardId);

          // Atualiza o estado removendo o card do loading
          setState((prevState: any) => ({
            ...prevState,
            inLoading: prevState?.inLoading?.filter((id: string) => id !== currentCardId) || [],
          }));

          // Verifica se todas as requisições foram concluídas
          checkAllRequestsCompleted(setIsLocalUpdate);
        },
        onError: (error: any) => {
          // Remove o card do conjunto de requisições pendentes
          pendingCardRequests.delete(currentCardId);

          // Atualiza o estado removendo o card do loading
          setState((prevState: any) => ({
            ...prevState,
            inLoading: prevState?.inLoading?.filter((id: string) => id !== currentCardId) || [],
          }));

          // Verifica se todas as requisições foram concluídas
          checkAllRequestsCompleted(setIsLocalUpdate);
          showCycle.refetch();
        },
      };
    }

    manyCard.mutate({
      id: card.id,
      body: {
        column_id,
        index: card.order - 1,
        card_id: card.card_id,
        order_type: moment,
      },
    });
  }
};
