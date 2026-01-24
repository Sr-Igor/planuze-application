import * as api from "#/web/req/plan";
import keys from "#/cache/keys";
import { useQuery } from "@tanstack/react-query";

import { plan } from "@repo/types";
import { useAuth } from "@repo/redux/hook";

import { Pagination } from "../../../@types";
import { placeholderData } from "./placeholder";

export interface IUsePlanProps {
  company_id?: string;
  enabled?: boolean;
}

export const usePlan = ({ company_id, enabled = true }: IUsePlanProps = {}) => {
  const indexKey = keys.plan.index(company_id);
  const { hasProfile, hasTwoAuth } = useAuth();

  const index = useQuery<Pagination<plan>>({
    queryKey: indexKey,
    queryFn: () =>
      company_id && hasProfile && hasTwoAuth ? api.indexPrivate() : api.indexPublic(),
    placeholderData,
    enabled,
  });

  return { index };
};
