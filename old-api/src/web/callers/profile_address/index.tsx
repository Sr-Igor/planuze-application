import * as api from "#/web/req/profile_address";
import { useNestedField } from "#/hooks/use-nested-field";
import { IUseCallerProps } from "#/types";

import { profile_address } from "@repo/types";

export const useProfileAddress = (props: IUseCallerProps<profile_address>) => {
  return useNestedField({
    ...props,
    api,
    rootCache: "profile",
    cache: "profile_address",
    field: "profile_address",
    accessKey: props.filters?.profile_id,
  });
};
