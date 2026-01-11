'use client';

import { useWorkType } from '@/api/callers/work_type';
import { TrashTemplate } from '@/templates/list/trash';

import { useTable } from './use-table';

export default function Page() {
    //Render
    return <TrashTemplate path='work_type' hookReq={useWorkType} useTable={useTable} />;
}
