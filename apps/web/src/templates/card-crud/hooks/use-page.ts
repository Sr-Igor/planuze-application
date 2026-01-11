import { useState } from 'react';

import { useShow } from '@/templates/show/context';

import { GenericItem, State } from '../type';

export const usePage = <T>() => {
    const { data, permissions, getPermissions } = useShow<GenericItem<T>>();

    const [state, setState] = useState<State<GenericItem<T>>>({});

    const handleState = (state: Partial<State<GenericItem<T>>>) => {
        setState((prev) => ({ ...prev, ...state }));
    };

    return {
        state,
        handleState,
        data,
        permissions,
        getPermissions
    };
};
