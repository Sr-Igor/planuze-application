import * as api from "#/web/req/client_address";
import { useNestedField } from "#/hooks/use-nested-field";

import { client_address } from "@repo/types";

import { IUseCallerProps } from "../../../types";

export const useClientAddress = (props: IUseCallerProps<client_address>) => {
  return useNestedField({
    ...props,
    api,
    rootCache: "client",
    cache: "client_address",
    field: "client_address",
    accessKey: props.filters?.client_id,
  });
};
