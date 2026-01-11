import { project_member } from "@repo/api/generator/types";

import { useInsert } from "@/api/hooks/use-insert";
import * as api from "@/api/req/project_member";
import { IUseCallerProps } from "@/api/types";

import { placeholder } from "./placeholder";

export const useProjectMember = (props: IUseCallerProps<project_member>) => {
  return useInsert({
    ...props,
    api,
    cache: "project_member",
    placeholder,
  });
};
