import * as api from "#/web/req/work_type";
import { useBase } from "#/hooks/use-base";
import { IUseCallerProps } from "#/types";

import { work_type } from "@repo/types";

export const useWorkType = (props: IUseCallerProps<work_type>) => {
  return useBase({
    ...props,
    api,
    cache: "work_type",
  });
};
