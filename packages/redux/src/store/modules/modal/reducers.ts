import * as types from './types';

export type ModalState = {
    not_found: boolean;
    inactive: boolean;
    profile: boolean;
    invite: boolean;
    error: boolean;
    redirect: boolean;
    message?: string;
    code?: string;
    canClose?: boolean;
};

const initialState = {
    not_found: false,
    inactive: false,
    profile: false,
    invite: false,
    error: false,
    redirect: false
};

type ModuleAction = {
    type: string;
    payload: Partial<ModalState>;
};

export default function modalReducer(state: ModalState = initialState, action: ModuleAction) {
    switch (action.type) {
        case types.MODAL_UPDATE:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}
