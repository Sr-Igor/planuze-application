import * as api from "#/web/req/profile_contact";
import { useNestedArray } from "#/hooks/use-nested-array";
import { IUseCallerProps } from "#/types";

import { profile_contact } from "@repo/types";

export const useProfileContact = (props: IUseCallerProps<profile_contact>) => {
  return useNestedArray({
    ...props,
    api,
    rootCache: "profile",
    cache: "profile_contact",
    field: "profile_contacts",
    accessKey: props.filters?.profile_id,
  });
};
