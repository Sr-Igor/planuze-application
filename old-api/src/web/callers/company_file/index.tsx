import * as api from "#/web/req/company_file";
import { useNestedArray } from "#/hooks/use-nested-array";

import { company_file } from "@repo/types";

import { IUseCallerProps } from "../../../types";

export const useCompanyFile = (props: IUseCallerProps<company_file>) => {
  return useNestedArray({
    ...props,
    api,
    rootCache: "company",
    cache: "company_file",
    field: "company_files",
    accessKey: props.filters?.company_id,
  });
};
