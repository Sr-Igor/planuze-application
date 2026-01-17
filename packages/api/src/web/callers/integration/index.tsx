import * as api from "#/web/req/integration";
import { useBase } from "#/hooks/use-base";
import { IUseCallerProps } from "#/types";

import { integration } from "@repo/types";

export const useIntegration = (props: IUseCallerProps<integration>) => {
  return useBase({
    ...props,
    api,
    cache: "integration",
  });
};
