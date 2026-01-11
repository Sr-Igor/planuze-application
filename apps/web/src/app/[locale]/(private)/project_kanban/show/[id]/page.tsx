'use client';

import { ShowKanbanProvider } from './context';
import { useCallers, useKanban, useQuery, useReq, useSelect, useStates, useUnload } from './hooks';
import { KanbanContainer } from './main';

export default function KanbanPage() {
    const general = useKanban();

    const query = useQuery();

    const req = useReq({ ...general, ...query });

    const state = useStates({ ...general, setParams: query.setParams });

    const callers = useCallers({ req, general, page: req.page });

    const select = useSelect({ ...query, kanban: req.page.kanban });

    const unload = useUnload();

    return (
        <ShowKanbanProvider
            {...req}
            {...query}
            general={general}
            state={state}
            callers={callers}
            select={select}
            unload={unload}>
            <KanbanContainer />
        </ShowKanbanProvider>
    );
}
