import { company_file } from "@repo/api/generator/types";

import { useNestedArray } from "@/api/hooks/use-nested-array";
import * as api from "@/api/req/company_file";
import { IUseCallerProps } from "@/api/types";

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
