import { useEffect } from 'react';

import { IUseEffectsProps } from '../types';

export const useEffects = ({ cycleServices, isLocalUpdate, setCycle, params, setState }: IUseEffectsProps) => {
    useEffect(() => {
        if (cycleServices.show.data && !isLocalUpdate) {
            setCycle(cycleServices.show.data);
        }
    }, [cycleServices.show.data, isLocalUpdate]);

    useEffect(() => {
        if (params.card_id) {
            //WARNING: FOr this case only is necessary id in card, because edit modal will call show request
            //@ts-ignore
            setState({ type: 'card', modes: ['update'], card: { id: params.card_id } });
        }
    }, []);
};
