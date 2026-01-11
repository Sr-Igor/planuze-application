import { profile_role } from "@repo/api/generator/types";

import { useNestedArray } from "@/api/hooks/use-nested-array";
import * as api from "@/api/req/profile_role";
import { IUseCallerProps } from "@/api/types";

export const useProfileRole = (props: IUseCallerProps<profile_role>) => {
  return useNestedArray({
    ...props,
    api,
    rootCache: "profile",
    cache: "profile_role",
    field: "profile_roles",
    accessKey: props.filters?.profile_id,
  });
};
