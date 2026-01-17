import * as api from "#/web/req/client_contact";
import { useNestedArray } from "#/hooks/use-nested-array";

import { client_contact } from "@repo/types";

import { IUseCallerProps } from "../../../types";

export const useClientContact = (props: IUseCallerProps<client_contact>) => {
  return useNestedArray({
    ...props,
    api,
    rootCache: "client",
    cache: "client_contact",
    field: "client_contacts",
    accessKey: props.filters?.client_id,
  });
};
