'use client';

import { useInvite } from '@/api/callers/invite';
import { invite } from '@/api/generator/types';
import { BaseTemplate } from '@/templates/list/base';

import { useActions, useForm, useTable } from './hooks';

export default function Page() {
    return (
        <BaseTemplate<invite>
            path='invite'
            hookReq={useInvite}
            useTable={useTable}
            useActions={useActions}
            useForm={useForm}
        />
    );
}
