'use client';

import { useEffect, useMemo } from 'react';

import { profile, project_kanban_cycle_card, project_kanban_cycle_card_type } from '@/api/generator/types';
import { index as indexProjectKanbanCycleCard } from '@/api/req/project_kanban_cycle_card';
import { AppCardTypeSelector } from '@/components/ui/app-card-type-selector';
import { AppCardSelector } from '@/components/ui/app-cycle-card-selector';
import { useAuth } from '@/hooks/auth';
import { useFormList } from '@/hooks/form';
import { Field } from '@/hooks/form/types';
import { Shallow } from '@/types/shallowType';
import { IValidatorRequest } from '@deviobr/validator';

import { useKanbanShow } from '../../context';

export interface IUseFormProps {
    disabled: boolean;
    project_id?: string;
    anchor?: project_kanban_cycle_card;
}

type FormType = Shallow<project_kanban_cycle_card>;

export const useForm = ({ disabled, anchor }: IUseFormProps) => {
    const { data, page, general, select } = useKanbanShow();
    const { user, profile } = useAuth();

    const cycles = data.cycles?.map((cycle) => ({
        label: cycle.title,
        value: cycle.id
    }));

    const defaultValues: Partial<FormType> = {
        card_id: anchor?.id,
        profile_id: profile?.id,
        project_kanban_cycle_id: page.cycle?.id,
        project_kanban_cycle_column_id: general?.state.columnId || page.cycle?.project_kanban_cycle_columns?.[0]?.id
    };

    // const [wCardType, setWCardType] = useState<project_kanban_cycle_card_type | null>(null);

    const schema: IValidatorRequest = {
        body: [
            {
                key: 'title',
                method: 'string',
                coerse: 'string'
            },
            {
                key: 'project_kanban_cycle_card_type_id',
                method: 'string',
                coerse: 'string',
                model: 'project_kanban_cycle_card_type',
                column: 'id'
            },
            {
                key: 'project_kanban_cycle_column_id',
                method: 'string',
                coerse: 'string',
                model: 'project_kanban_cycle_column',
                column: 'id'
            },
            {
                key: 'card_id',
                method: 'string',
                coerse: 'string',
                optional: true,
                model: 'project_kanban_cycle_card',
                column: 'id',
                nullable: true
            },
            {
                key: 'profile_id',
                method: 'string',
                coerse: 'string',
                model: 'profile',
                column: 'id',
                optional: true,
                nullable: true
            },
            {
                key: 'project_kanban_cycle_id',
                method: 'string',
                coerse: 'string',
                model: 'project_kanban_cycle',
                column: 'id'
            }
        ]
    };

    const fields: Field<Partial<FormType>>[] = [
        {
            field: 'input',
            name: 'title',
            label: 'title',
            required: true,
            disabled,
            className: 'col-span-2'
        },
        {
            field: 'select',
            name: 'project_kanban_cycle_card_type_id',
            label: 'project_kanban_cycle_card_type_id',
            required: true,
            disabled,
            className: 'col-span-2',
            formatterOptions: ({ item }) => {
                return <AppCardTypeSelector item={item} />;
            },
            customSelect: (item) => {
                return item && <AppCardTypeSelector item={item} />;
            },
            options:
                data.cardsTypes
                    ?.filter((cardType) => !anchor?.id || !cardType.principal)
                    ?.map((cardType) => ({
                        label: cardType.title,
                        value: cardType.id,
                        item: cardType
                    })) || []
        },
        {
            field: 'infinity_select',
            name: 'card_id',
            label: 'card_id',
            disabled: disabled || !!anchor?.id,
            className: 'col-span-2',
            cacheKey: 'project_kanban_cycle_card_anchored_infinity',
            request: indexProjectKanbanCycleCard,
            queryParams: {
                project_kanban_cycle_id: page.cycle?.id,
                principal: true
            },
            formatter: (items: project_kanban_cycle_card[]) =>
                items?.map((item) => ({
                    label: item.title,
                    value: item.id,
                    item
                })) || [],
            formatterOptions: (item: project_kanban_cycle_card) => {
                return <AppCardSelector item={item} showPath={false} />;
            },
            fallbackValue: anchor?.title,
            enabledOnOpen: true
        },
        {
            field: 'infinity_select',
            name: 'profile_id',
            label: 'profile_id',
            required: true,
            disabled,
            className: 'col-span-2',
            cacheKey: 'profile_infinity',
            index: select.profile,
            search: select.search.profile,
            setSearch: (search) => select.handleSearch('profile', search),
            formatter: (items: profile[]) => {
                const memberProfileIds = data.profiles?.map((p) => p.profile_id) || [];
                return (
                    items
                        ?.filter((profile) => memberProfileIds.includes(profile.id))
                        ?.map((profile) => ({
                            label: profile.user?.name || '',
                            value: profile.id,
                            item: profile
                        })) || []
                );
            },
            fallbackValue: user?.name
        },
        {
            field: 'select',
            name: 'project_kanban_cycle_id',
            label: 'project_kanban_cycle_id',
            className: 'col-span-2',
            disabled: disabled || !!anchor?.id,
            required: true,
            options: cycles
        },
        {
            field: 'select',
            name: 'project_kanban_cycle_column_id',
            label: 'project_kanban_cycle_column_id',
            className: 'col-span-2',
            disabled,
            required: true
        }
    ];

    const form = useFormList<Partial<FormType>>({
        fields,
        schema,
        defaultValues: defaultValues
    });

    const cycleId = form.hook.watch('project_kanban_cycle_id');
    const cardTypeId = form.hook.watch('project_kanban_cycle_card_type_id');
    const cardType = data.cardsTypes?.find((cardType) => cardType.id === cardTypeId);

    const columns = useMemo(() => {
        return (
            data.cycles
                .find((cycle) => cycle.id === cycleId)
                ?.project_kanban_cycle_columns?.sort((a, b) => a.order - b.order)
                ?.map((column) => ({
                    label: column.title,
                    value: column.id
                })) || []
        );
    }, [data.cycles, cycleId]);

    useEffect(() => {
        if (!form.isDirty) return;
        form.hook.setValue('project_kanban_cycle_column_id', columns[0]?.value);
    }, [columns]);

    useEffect(() => {
        if (!form.isDirty) return;
        if (cardType?.principal) form.hook.setValue('card_id', undefined);
    }, [cardType]);

    return {
        ...form,
        formProps: {
            ...form.formProps,
            fields: fields.map((field) => {
                switch (field.name) {
                    case 'project_kanban_cycle_column_id':
                        return {
                            ...field,
                            options: columns
                        };
                    case 'project_kanban_cycle_card_type_id':
                        return {
                            ...field,
                            immediatelyCallback: (item: project_kanban_cycle_card_type) => {
                                form.hook.setValue('project_kanban_cycle_card_type_id', item?.id, {
                                    shouldDirty: false
                                });
                            }
                        };
                    case 'card_id':
                        return {
                            ...field,
                            hide: cardType?.principal
                        };
                    default:
                        return field;
                }
            })
        },
        config: {
            schema,
            fields,
            defaultValues
        }
    };
};
