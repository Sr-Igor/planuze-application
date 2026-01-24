import * as api from "#/web/req/cost_center";
import { useBase } from "#/hooks/use-base";

import { cost_center } from "@repo/types";

import { IUseCallerProps } from "../../../types";

export const useCostCenter = (props: IUseCallerProps<cost_center>) => {
  return useBase({
    ...props,
    api,
    cache: "cost_center",
  });
};
