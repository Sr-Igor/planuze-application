import * as api from "#/web/req/profile_file";
import { useNestedArray } from "#/hooks/use-nested-array";
import { IUseCallerProps } from "#/types";

import { profile_file } from "@repo/types";

export const useProfileFile = (props: IUseCallerProps<profile_file>) => {
  return useNestedArray({
    ...props,
    api,
    rootCache: "profile",
    cache: "profile_file",
    field: "profile_files",
    accessKey: props.filters?.profile_id,
  });
};
