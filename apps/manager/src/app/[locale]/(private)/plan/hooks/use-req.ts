import { usePlan } from "@repo/api/manager";

import { IUseReqProps } from "../types";

export const useReq = ({ state, handleState }: IUseReqProps) => {
  const { index } = usePlan({
    enabledIndex: true,
    filters: state.filters,
    id: state?.item?.id,
    callbacks: {
      many: {
        onSuccess: () => {
          handleState({ open: undefined, item: undefined, selected: [], loadingLines: [] });
        },
        onError: () => {
          handleState({ loadingLines: [] });
        },
      },
    },
  });

  return {
    index,
  };
};
