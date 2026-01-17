import { WarningState } from './reducers';
import * as types from './types';

export const update = (params: Partial<WarningState>) => {
    return {
        type: types.WARNING_UPDATE,
        payload: params
    };
};
