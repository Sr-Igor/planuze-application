import * as api from "#/web/req/level";
import { useBase } from "#/hooks/use-base";
import { IUseCallerProps } from "#/types";

import { level } from "@repo/types";

export const useLevel = (props: IUseCallerProps<level>) => {
  return useBase({
    ...props,
    api,
    cache: "level",
  });
};
