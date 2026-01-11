import { work_type } from "@repo/api/generator/types";

import { useBase } from "@/api/hooks/use-base";
import * as api from "@/api/req/work_type";
import { IUseCallerProps } from "@/api/types";

export const useWorkType = (props: IUseCallerProps<work_type>) => {
  return useBase({
    ...props,
    api,
    cache: "work_type",
  });
};
