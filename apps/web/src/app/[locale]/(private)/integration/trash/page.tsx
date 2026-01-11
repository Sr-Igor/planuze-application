'use client';

import { useIntegration } from '@/api/callers/integration';
import { TrashTemplate } from '@/templates/list/trash';

import { useTable } from './use-table';

export default function Page() {
    //Render
    return <TrashTemplate path='integration' hookReq={useIntegration} useTable={useTable} />;
}
