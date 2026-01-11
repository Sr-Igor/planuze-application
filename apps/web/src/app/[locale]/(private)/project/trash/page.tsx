'use client';

import { useProject } from '@/api/callers/project';
import { TrashTemplate } from '@/templates/list/trash';

import { useTable } from './use-table';

export default function Page() {
    //Render
    return <TrashTemplate path='project' hookReq={useProject} useTable={useTable} />;
}
