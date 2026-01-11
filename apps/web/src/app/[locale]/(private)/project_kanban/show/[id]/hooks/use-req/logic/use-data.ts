import { useMemo } from 'react';

import { IProfile } from '@/app/[locale]/(private)/project_kanban/show/[id]/types';

import { IUseDataProps, IUseDataReturnProps } from '../types';
import { mapProfiles } from '../utils';

export const useData = ({ services, params, cycleId, kanban }: IUseDataProps): IUseDataReturnProps => {
    const cards = services.card.quickIndex?.data?.data || [];

    //Cards Types
    const cardsTypes = services.cardType.index?.data?.data || [];

    //Members
    const members = services.member.index?.data?.data || [];

    //Configs
    const configs = services.config.index?.data?.data || [];

    //Global Allocations
    const globalAllocations = services.globalAllocation.index?.data?.data || [];

    //Tools
    const tools = services.tool.index?.data?.data || [];

    //Allocations
    const allAllocations = services.allocation.index?.data?.data || [];
    const allocations = allAllocations.filter((allocation: any) => allocation.project_kanban_cycle_id === cycleId);

    const visibleCards = {
        project_kanban_cycle_card_type_id: params?.cardType?.split(',')?.filter(Boolean) || [],
        title: params?.search?.split(',')?.filter(Boolean) || [],
        profile_id: params?.member?.split(',')?.filter(Boolean) || [],
        work_type_id: params?.workType?.split(',')?.filter(Boolean) || [],
        public_id: params?.public_id?.split(',')?.filter(Boolean) || [],
        description: params?.description?.split(',')?.filter(Boolean) || [],
        tag: params?.tag?.split(',')?.filter(Boolean) || [],
        project_kanban_objective_id: params?.objective?.split(',')?.filter(Boolean) || [],
        end_date_estimate: {
            start: params?.end_date_estimate_start,
            end: params?.end_date_estimate_end
        },
        end_date_execute: {
            start: params?.end_date_execute_start,
            end: params?.end_date_execute_end
        },
        createdAt: {
            start: params?.startDate,
            end: params?.endDate
        },
        severity: {
            min: params?.severity_min,
            max: params?.severity_max
        },
        priority: {
            min: params?.priority_min,
            max: params?.priority_max
        },
        estimate: {
            min: params?.estimate_min,
            max: params?.estimate_max
        },
        execute: {
            min: params?.execute_min,
            max: params?.execute_max
        },
        work_in_progress: {
            min: params?.work_in_progress_min,
            max: params?.work_in_progress_max
        }
    };

    const allProfiles: IProfile[] = useMemo(() => {
        return mapProfiles({ allocations, members });
    }, [allocations, members]);

    const profiles: IProfile[] = useMemo(() => {
        return mapProfiles({ allocations: allAllocations, members });
    }, [allocations, members]);

    const cycles = kanban?.project_kanban_cycles || [];

    return {
        cycles,
        cards,
        cardsTypes,
        members,
        allocations,
        visibleCards,
        tools,
        allProfiles,
        profiles,
        configs,
        globalAllocations
    };
};
