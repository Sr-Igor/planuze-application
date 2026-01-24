import * as api from "#/web/req/profile_document";
import { useNestedArray } from "#/hooks/use-nested-array";
import { IUseCallerProps } from "#/types";

import { profile_document } from "@repo/types";

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
