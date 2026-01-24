import * as api from "#/web/req/profile_role";
import { useNestedArray } from "#/hooks/use-nested-array";
import { IUseCallerProps } from "#/types";

import { profile_role } from "@repo/types";

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
