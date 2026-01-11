import { useMemo, useState } from 'react';

import { useParams } from 'next/navigation';

import { project_kanban, project_kanban_cycle } from '@/api/generator/types';
import { useQueryClient } from '@tanstack/react-query';

import { Mode } from '../../../types';
import { useKanban } from '../services/use-kanban';
import { IUsePageProps, IUsePageReturnProps } from '../types';

export const usePage = ({ handleClose, params, setParams }: IUsePageProps): IUsePageReturnProps => {
    const id = useParams()?.id as string;

    const { show } = useKanban({ id });

    const queryClient = useQueryClient();

    const kanban: project_kanban | undefined = show?.data;

    const [cycle, setCycle] = useState<project_kanban_cycle | undefined>();
    const [isCreatingLCard, setIsCreatingLCard] = useState(false);
    const [isLocalUpdate, setIsLocalUpdate] = useState(false);
    const [search, setSearch] = useState('');

    const activeCycle = kanban?.project_kanban_cycles?.find((cycle) => cycle.id === params?.cycle);

    const cycleId = useMemo(() => {
        if (show.isPending) return params?.cycle;
        const validCycle = activeCycle?.id || kanban?.project_kanban_cycles?.[0]?.id;

        if (validCycle !== activeCycle?.id) setParams({ cycle: validCycle });

        return validCycle;
    }, [activeCycle, kanban, show?.isPending]);

    const onSuccess = ({ keepModes }: { keepModes: Partial<Mode>[] } = { keepModes: [] }) => {
        const modes: Mode[] = ['store', 'update', 'destroy', 'order', 'trash', 'restore', 'move', 'change'];
        const modesToClose = modes.filter((mode) => !keepModes?.includes(mode));
        handleClose(modesToClose);
        isLocalUpdate && setIsLocalUpdate(false);
        isCreatingLCard && setIsCreatingLCard(false);
    };

    return {
        //Data
        id,
        show,
        cycle,
        search,
        kanban,
        cycleId,
        queryClient,
        activeCycle,
        isLocalUpdate,
        isCreatingLCard,

        //Setters
        setCycle,
        setSearch,
        onSuccess,
        setIsLocalUpdate,
        setIsCreatingLCard
    };
};
