import { useQuery } from "@tanstack/react-query";

import type { Pagination, plan } from "@repo/types";

import { cacheKeys } from "../../../infrastructure/cache/keys";
import { planPlaceholder } from "../../../shared/constants/placeholders";
import { planEndpoint } from "../endpoints/plan";

export interface UsePlanProps {
  companyId?: string;
  enabled?: boolean;
  isAuthenticated?: boolean;
}

export const usePlan = ({
  companyId,
  enabled = true,
  isAuthenticated = false,
}: UsePlanProps = {}) => {
  const indexKey = cacheKeys.plan.index(companyId);

  const index = useQuery<Pagination<plan>>({
    queryKey: indexKey,
    queryFn: () =>
      companyId && isAuthenticated ? planEndpoint.indexPrivate() : planEndpoint.indexPublic(),
    placeholderData: planPlaceholder,
    enabled,
  });

  return { index };
};
