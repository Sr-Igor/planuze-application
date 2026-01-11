import { ModuleState } from './reducers';
import * as types from './types';

export const set = (params: Partial<ModuleState>) => {
    return {
        type: types.MODULE_SET,
        payload: params
    };
};
