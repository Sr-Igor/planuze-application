import * as api from "#/web/req/client_document";
import { useNestedArray } from "#/hooks/use-nested-array";

import { client_document } from "@repo/types";

import { IUseCallerProps } from "../../../types";

export const useClientDocument = (props: IUseCallerProps<client_document>) => {
  return useNestedArray({
    ...props,
    api,
    rootCache: "client",
    cache: "client_document",
    field: "client_documents",
    accessKey: props.filters?.client_id,
  });
};
