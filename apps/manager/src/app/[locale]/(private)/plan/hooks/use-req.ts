import { usePlan } from "@repo/api/manager";

import { IUseReqProps } from "../types";

export const useReq = ({ state, handleState }: IUseReqProps) => {
  const { index } = usePlan({
    enabledIndex: true,
    filters: state.filters as any,
    id: state?.item?.id,
  });

  return {
    index,
  };
};
