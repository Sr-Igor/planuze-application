import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@repo/redux/hook";
import type { Pagination, plan } from "@repo/types";

import { cacheKeys } from "../../../infrastructure/cache/keys";
import { planPlaceholder } from "../../../shared/constants/placeholders";
import { planEndpoint } from "../endpoints/plan";

export interface UsePlanProps {
  companyId?: string;
  enabled?: boolean;
}

/**
 * Hook for Plan operations
 * Matches old-project behavior: company_id && hasProfile && hasTwoAuth ? api.indexPrivate() : api.indexPublic()
 */
export const usePlan = ({ companyId, enabled = true }: UsePlanProps = {}) => {
  const indexKey = cacheKeys.plan.index(companyId);
  const { hasProfile, hasTwoAuth } = useAuth();

  const index = useQuery<Pagination<plan>>({
    queryKey: indexKey,
    queryFn: () =>
      companyId && hasProfile && hasTwoAuth
        ? planEndpoint.indexPrivate()
        : planEndpoint.indexPublic(),
    placeholderData: planPlaceholder,
    enabled,
  });

  return { index };
};
