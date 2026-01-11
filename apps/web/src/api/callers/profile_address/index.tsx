import { profile_address } from "@repo/api/generator/prisma-types";

import { useNestedField } from "@/api/hooks/use-nested-field";
import * as api from "@/api/req/profile_address";
import { IUseCallerProps } from "@/api/types";

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
