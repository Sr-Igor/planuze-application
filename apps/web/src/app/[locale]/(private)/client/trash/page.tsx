'use client';

import { useClient } from '@/api/callers/client';
import { TrashTemplate } from '@/templates/list/trash';

import { useTable } from './use-table';

export default function Page() {
    //Render
    return <TrashTemplate path='client' hookReq={useClient} useTable={useTable} />;
}
