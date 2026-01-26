import { useQuery } from "@tanstack/react-query";

import type { company, Pagination } from "@repo/types";

import { companyEndpoint } from "../endpoints/company";
import type { CompanyIndexQuery } from "../endpoints/company/company.types";

export interface UseCompanyProps {
  filters?: CompanyIndexQuery;
  enabledIndex?: boolean;
}

export const useCompany = ({ filters, enabledIndex }: UseCompanyProps = {}) => {
  const indexKey = ["company", filters];

  const index = useQuery<Pagination<company>>({
    queryKey: indexKey,
    queryFn: () => companyEndpoint.index(filters),
    enabled: !!enabledIndex,
  });

  return { index };
};
