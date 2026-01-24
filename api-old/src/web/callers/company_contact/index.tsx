import * as api from "#/web/req/company_contact";
import { useNestedArray } from "#/hooks/use-nested-array";

import { company_contact } from "@repo/types";

import { IUseCallerProps } from "../../../types";

export const useCompanyContact = (props: IUseCallerProps<company_contact>) => {
  return useNestedArray({
    ...props,
    api,
    rootCache: "company",
    cache: "company_contact",
    field: "company_contacts",
    accessKey: props.filters?.company_id,
  });
};
