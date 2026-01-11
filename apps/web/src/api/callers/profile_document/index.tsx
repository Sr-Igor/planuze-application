import { profile_document } from "@repo/api/generator/types";

import { useNestedArray } from "@/api/hooks/use-nested-array";
import * as api from "@/api/req/profile_document";
import { IUseCallerProps } from "@/api/types";

export const useProfileDocument = (props: IUseCallerProps<profile_document>) => {
  return useNestedArray({
    ...props,
    api,
    rootCache: "profile",
    cache: "profile_document",
    field: "profile_documents",
    accessKey: props.filters?.profile_id,
  });
};
