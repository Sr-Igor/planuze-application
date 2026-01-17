'use client';

import { useRole } from '@repo/api/web/callers/role';
import { TrashTemplate } from '@/templates/list/trash';

import { useTable } from './use-table';

export default function Page() {
    //Render
    return <TrashTemplate path='role' hookReq={useRole} useTable={useTable} />;
}
