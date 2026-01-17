'use client';

import { useCostCenter } from '@repo/api/web/callers/cost_center';
import { TrashTemplate } from '@/templates/list/trash';

import { useTable } from './use-table';

export default function Page() {
    //Render
    return <TrashTemplate path='cost_center' hookReq={useCostCenter} useTable={useTable} />;
}
