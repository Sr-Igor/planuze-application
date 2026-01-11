'use client';

import { useLevel } from '@/api/callers/level';
import { TrashTemplate } from '@/templates/list/trash';

import { useTable } from './use-table';

export default function Page() {
    //Render
    return <TrashTemplate path='level' hookReq={useLevel} useTable={useTable} />;
}
