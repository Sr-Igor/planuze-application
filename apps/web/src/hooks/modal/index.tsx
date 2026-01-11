import { update } from '@/store/modules/modal/actions';
import { ModalState } from '@/store/modules/modal/reducers';

import { useAppDispatch, useAppSelector } from '../redux';

export const useModal = () => {
    const dispatch = useAppDispatch();

    const setModal = (params: Partial<ModalState>) => {
        dispatch(update(params));
    };

    const modal = useAppSelector((state) => state.modal);

    return { setModal, modal };
};
