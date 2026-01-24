import * as api from "#/web/req/profile";
import { useBase } from "#/hooks/use-base";
import { IUseCallerProps } from "#/types";

import { profile } from "@repo/types";

export const useProfile = (props: IUseCallerProps<profile>) => {
  return useBase({
    ...props,
    api,
    cache: "profile",
  });
};
