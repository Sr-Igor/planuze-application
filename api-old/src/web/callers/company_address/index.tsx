import * as api from "#/web/req/company_address";
import { useNestedField } from "#/hooks/use-nested-field";

import { company_address } from "@repo/types";

import { IUseCallerProps } from "../../../types";

export const useCompanyAddress = (props: IUseCallerProps<company_address>) => {
  return useNestedField({
    ...props,
    api,
    rootCache: "company",
    cache: "company_address",
    field: "company_address",
    accessKey: props.filters?.company_id,
  });
};
