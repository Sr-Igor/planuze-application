import * as api from "#/web/req/project_member";
import { useInsert } from "#/hooks/use-insert";
import { IUseCallerProps } from "#/types";

import { project_member } from "@repo/types";

import { placeholder } from "./placeholder";

export const useProjectMember = (props: IUseCallerProps<project_member>) => {
  return useInsert({
    ...props,
    api,
    cache: "project_member",
    placeholder,
  });
};
