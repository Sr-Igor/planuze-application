import * as api from "#/web/req/client";
import { useBase } from "#/hooks/use-base";

import { client } from "@repo/types";

import { IUseCallerProps } from "../../../types";

export const useClient = (props: IUseCallerProps<client>) => {
  return useBase({
    ...props,
    api,
    cache: "client",
  });
};
