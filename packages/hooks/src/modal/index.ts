import { useAppDispatch, useAppSelector } from "@repo/redux/hook";
import { update } from "@repo/redux/store/modules/modal/actions";
import { ModalState } from "@repo/redux/store/modules/modal/reducers";

export const useModal = () => {
  const dispatch = useAppDispatch();

  const setModal = (params: Partial<ModalState>) => {
    dispatch(update(params));
  };

  const modal = useAppSelector((state) => state.modal);

  return { setModal, modal };
};
