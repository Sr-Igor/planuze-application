import { useCallback } from "react";

import { BoardUpdateProps } from "../../types";
import { useData, useEffects, useLoading, usePage } from "./logic";
import {
  useAllocation,
  useCard,
  useColumn,
  useConfig,
  useCycle,
  useGlobalAllocation,
  useMember,
  useReport,
  useTool,
} from "./services";
import { useCardType } from "./services/use-card-type";
import { IUseReqProps, IUseReqReturnProps, Services } from "./types";
import { boardUpdate, handleDestroy } from "./utils";

export const useReq = ({
  state,
  setState,
  params,
  setParams,
  handleClose,
}: IUseReqProps): IUseReqReturnProps => {
  const page = usePage({ handleClose, params, setParams });

  //------------------------------- CALLERS -------------------------------//
  const cycleServices = useCycle({ ...page, state });
  const columnServices = useColumn({ ...page, state });
  const allocationServices = useAllocation({ ...page, state });
  const cardTypeServices = useCardType({ ...page, state });
  const cardServices = useCard({ ...page, state, params });
  const memberServices = useMember({ ...page, state });
  const reportServices = useReport({ ...page, params });
  const configServices = useConfig({ ...page, state });
  const globalAllocationServices = useGlobalAllocation({ ...page, state });
  const toolServices = useTool({ ...page, state });

  const services: Services = {
    cycle: cycleServices,
    column: columnServices,
    allocation: allocationServices,
    card: cardServices,
    cardType: cardTypeServices,
    member: memberServices,
    report: reportServices,
    config: configServices,
    globalAllocation: globalAllocationServices,
    tool: toolServices,
  };

  //------------------------------- DATA -------------------------------//
  const data = useData({
    ...page,
    services,
    params,
  });

  //------------------------------- EFFECTS -------------------------------//
  useEffects({ ...page, cycleServices, params, setState });

  //------------------------------- HANDLERS -------------------------------//
  const loadings = useLoading({ services, kanbanShow: page.show });
  const destroy = useCallback(
    (data: any) => {
      handleDestroy({ services, state, data });
    },
    [services, state]
  );

  const updateBoard = ({ board, item, type, moment }: BoardUpdateProps) => {
    boardUpdate({
      ...page,
      boardProps: { board, item, type, moment },
      manyCard: services.card.many,
      manyColumn: services.column.many,
      showCycle: services.cycle.show,
      state,
      setState,
    });
  };

  //------------------------------- RETURN -------------------------------//
  return {
    page,
    data,
    destroy,
    loadings,
    services,
    updateBoard,
  };
};
