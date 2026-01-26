import { useQuery } from "@tanstack/react-query";

import type { client, Pagination } from "@repo/types";

import { billingErrorEndpoint } from "../endpoints/billing_error";
import type { BillingErrorIndexQuery } from "../endpoints/billing_error/billing_error.types";

export interface UseBillingErrorProps {
  filters?: BillingErrorIndexQuery;
  enabledIndex?: boolean;
}

export const useBillingError = ({ filters, enabledIndex }: UseBillingErrorProps = {}) => {
  const indexKey = ["billing_error", filters];

  const index = useQuery<Pagination<client>>({
    queryKey: indexKey,
    queryFn: () => billingErrorEndpoint.index(filters),
    enabled: !!enabledIndex,
  });

  return { index };
};
