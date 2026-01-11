'use client';

import { useKanbanTemplateTag } from '@/api/callers/kanban_template_tag';
import { kanban_template_tag } from '@/api/generator/types';
import { BaseTemplate } from '@/templates/list/base';

import { useActions, useForm, useTable } from './hooks';

export default function Page() {
    return (
        <BaseTemplate<kanban_template_tag>
            path='kanban_template_tag'
            hookReq={useKanbanTemplateTag}
            useTable={useTable}
            useActions={useActions}
            useForm={useForm}
            showLogs
        />
    );
}
