'use client';

import { useKanbanTemplate } from '@/api/callers/kanban_template';
import { ShowTemplate } from '@/templates/show';

import { useTabs } from './use-tabs';

export default function Page() {
    return (
        <ShowTemplate
            useTabs={useTabs}
            path='kanban_template'
            hookReq={useKanbanTemplate}
            defaultTab='data'
            baseUrl='/kanban_template'
        />
    );
}
