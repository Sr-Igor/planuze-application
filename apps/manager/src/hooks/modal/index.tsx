import { useEffect } from "react";

import { useAppDispatch } from "@repo/redux/hook";
import { update } from "@repo/redux/store/modules/modal/actions";
import { ModalState } from "@repo/redux/store/modules/modal/reducers";

export interface IModalHook {
  error: any;
  code?: number;
}

export const useModal = (params?: IModalHook) => {
  const dispatch = useAppDispatch();

  const set = (params: Partial<ModalState>) => {
    dispatch(update(params));
  };

  useEffect(() => {
    if (params?.error?.data?.status === (params?.code || 404)) set({ not_found: true });
  }, [params?.error]);

  return set;
};
