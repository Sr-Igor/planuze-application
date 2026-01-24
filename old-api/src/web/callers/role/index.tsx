import * as api from "#/web/req/role";
import { useBase } from "#/hooks/use-base";
import { IUseCallerProps } from "#/types";

import { role } from "@repo/types";

export const useRole = (props: IUseCallerProps<role>) => {
  return useBase({
    ...props,
    api,
    cache: "role",
  });
};
