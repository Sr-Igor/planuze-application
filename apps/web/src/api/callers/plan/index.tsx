import keys from '@/api/cache/keys';
import { plan } from '@/api/generator/types';
import * as api from '@/api/req/plan';
import { useAuth } from '@/hooks/auth';
import { Pagination } from '@/types/pagination';
import { useQuery } from '@tanstack/react-query';

import { placeholderData } from './placeholder';

export interface IUsePlanProps {
    company_id?: string;
    enabled?: boolean;
}

export const usePlan = ({ company_id, enabled = true }: IUsePlanProps = {}) => {
    const indexKey = keys.plan.index(company_id);
    const { hasProfile, hasTwoAuth } = useAuth();

    const index = useQuery<Pagination<plan>>({
        queryKey: indexKey,
        queryFn: () => (company_id && hasProfile && hasTwoAuth ? api.indexPrivate() : api.indexPublic()),
        placeholderData,
        enabled
    });

    return { index };
};
