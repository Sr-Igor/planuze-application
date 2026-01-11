'use client';

import { useProjectKanban } from '@/api/callers/project_kanban';
import { TrashTemplate } from '@/templates/list/trash';

import { useTable } from './use-table';

export default function Page() {
    //Render
    return <TrashTemplate path='project_kanban' hookReq={useProjectKanban} useTable={useTable} />;
}
