'use client';

import { useIntegration } from '@/api/callers/integration';
import { integration } from '@/api/generator/types';
import { BaseTemplate } from '@/templates/list/base';

import { useActions, useTable } from './hooks';

export default function Page() {
    return (
        <BaseTemplate<integration>
            path='integration'
            redirect='show'
            hookReq={useIntegration}
            useTable={useTable}
            useActions={useActions}
        />
    );
}
