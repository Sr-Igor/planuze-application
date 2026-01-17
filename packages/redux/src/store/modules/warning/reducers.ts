import * as types from './types';

export type WarningState = {
    open?: boolean;
    date?: Date;
};

const initialState = {};

type WarningAction = {
    type: string;
    payload: Partial<WarningState>;
};

export default function warningReducer(state: WarningState = initialState, action: WarningAction) {
    switch (action.type) {
        case types.WARNING_UPDATE:
            return {
                ...state,
                ...action.payload
            };

        default:
            return state;
    }
}
