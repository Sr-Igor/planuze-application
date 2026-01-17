import { ModalState } from './reducers';
import * as types from './types';

export const update = (params: Partial<ModalState>) => {
    return {
        type: types.MODAL_UPDATE,
        payload: params
    };
};
