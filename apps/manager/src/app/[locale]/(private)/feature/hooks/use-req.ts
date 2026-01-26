import { useFeature } from "@repo/api/manager";

import { IUseReqProps } from "../types";

export const useReq = ({ state, handleState }: IUseReqProps) => {
  const { index, store, update } = useFeature({
    enabledIndex: true,
    filters: state.filters as any,
    id: state?.item?.id,
    callbacks: {
      store: {
        onSuccess: () => {
          handleState({ open: undefined, item: undefined });
        },
      },
      update: {
        onSuccess: () => {
          handleState({ open: undefined, item: undefined });
        },
      },
    },
  });

  return {
    index,
    store,
    update,
  };
};
