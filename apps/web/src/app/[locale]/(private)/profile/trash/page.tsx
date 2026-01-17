'use client';

import { useProfile } from '@repo/api/web/callers/profile';
import { TrashTemplate } from '@/templates/list/trash';

import { useTable } from './use-table';

export default function Page() {
    //Render
    return <TrashTemplate path='profile' hookReq={useProfile} useTable={useTable} />;
}
