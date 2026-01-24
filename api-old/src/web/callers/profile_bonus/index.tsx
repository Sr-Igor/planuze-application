import * as api from "#/web/req/profile_bonus";
import { useNestedArray } from "#/hooks/use-nested-array";
import { IUseCallerProps } from "#/types";

import { profile_bonus } from "@repo/types";

export const useProfileBonus = (props: IUseCallerProps<profile_bonus>) => {
  return useNestedArray({
    ...props,
    api,
    rootCache: "profile",
    cache: "profile_bonus",
    field: "profile_bonus",
    accessKey: props.filters?.profile_id,
  });
};
