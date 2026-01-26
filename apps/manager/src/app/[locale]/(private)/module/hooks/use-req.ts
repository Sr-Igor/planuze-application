import { useCompany, useModule } from "@repo/api/manager";

import { IUseReqProps } from "../types";

export const useReq = ({ state, handleState }: IUseReqProps) => {
  const { index, store, update } = useModule({
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

  const { index: companyIndex } = useCompany({
    enabledIndex: true,
  });

  return {
    index,
    store,
    update,
    companies: companyIndex.data?.data || [],
  };
};
