'use client';

import { useKanbanTemplate } from '@/api/callers/kanban_template';
import { TrashTemplate } from '@/templates/list/trash';

import { useTable } from './use-table';

export default function Page() {
    //Render
    return <TrashTemplate path='kanban_template' hookReq={useKanbanTemplate} useTable={useTable} />;
}
