'use client';

import { useClient } from '@/api/callers/client';
import { client } from '@/api/generator/types';
import { BaseTemplate } from '@/templates/list/base';

import { useActions, useTable } from './hooks';

export default function Page() {
    return (
        <BaseTemplate<client>
            path='client'
            redirect='show'
            hookReq={useClient}
            useTable={useTable}
            useActions={useActions}
        />
    );
}
