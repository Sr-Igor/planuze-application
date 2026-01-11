'use client';

import { useLevel } from '@/api/callers/level';
import { level } from '@/api/generator/types';
import { useAuth } from '@/hooks/auth';
import { BaseTemplate } from '@/templates/list/base';

import { useActions, useTable } from './hooks';

export default function Page() {
    const { profile } = useAuth();
    return (
        <BaseTemplate<level>
            path='level'
            redirect='show'
            hookReq={useLevel}
            useTable={(props) => useTable({ ...props, profile })}
            useActions={useActions}
        />
    );
}
