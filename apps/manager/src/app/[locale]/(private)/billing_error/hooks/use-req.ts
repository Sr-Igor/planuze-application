import { useBillingError } from "@repo/api/manager";

import { IUseReqProps } from "../types";

export const useReq = ({ state }: IUseReqProps) => {
  const { index } = useBillingError({
    enabledIndex: true,
    filters: state.filters as any,
  });

  return {
    index,
  };
};
