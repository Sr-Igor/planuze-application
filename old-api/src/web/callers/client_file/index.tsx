import * as api from "#/web/req/client_file";
import { useNestedArray } from "#/hooks/use-nested-array";

import { client_file } from "@repo/types";

import { IUseCallerProps } from "../../../types";

export const useClientFile = (props: IUseCallerProps<client_file>) => {
  return useNestedArray({
    ...props,
    api,
    rootCache: "client",
    cache: "client_file",
    field: "client_files",
    accessKey: props.filters?.client_id,
  });
};
