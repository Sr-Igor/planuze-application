import * as api from "#/web/req/company_document";
import { useNestedArray } from "#/hooks/use-nested-array";

import { company_document } from "@repo/types";

import { IUseCallerProps } from "../../../types";

export const useCompanyDocument = (props: IUseCallerProps<company_document>) => {
  return useNestedArray({
    ...props,
    api,
    rootCache: "company",
    cache: "company_document",
    field: "company_documents",
    accessKey: props.filters?.company_id,
  });
};
