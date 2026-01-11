'use client';

import { useWorkType } from '@/api/callers/work_type';
import { work_type } from '@/api/generator/types';
import { BaseTemplate } from '@/templates/list/base';

import { useActions, useForm, useTable } from './hooks';

export default function Page() {
    return (
        <BaseTemplate<work_type>
            path='work_type'
            hookReq={useWorkType}
            useTable={useTable}
            useActions={useActions}
            useForm={useForm}
            showLogs
        />
    );
}
