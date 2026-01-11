import { CheckboxState } from '../types';

export function getCheckboxState(all: boolean, some: boolean): CheckboxState {
    if (all) return true;
    if (some) return 'indeterminate';
    return false;
}
