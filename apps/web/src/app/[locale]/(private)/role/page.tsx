'use client';

import { useRole } from '@/api/callers/role';
import { role } from '@/api/generator/types';
import { BaseTemplate } from '@/templates/list/base';

import { useActions, useForm, useTable } from './hooks';

export default function Page() {
    return (
        <>
            <BaseTemplate<role>
                path='role'
                hookReq={useRole}
                useTable={useTable}
                useActions={useActions}
                useForm={useForm}
                showLogs
            />
        </>
    );
}
