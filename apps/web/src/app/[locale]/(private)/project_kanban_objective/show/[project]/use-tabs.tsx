import { project_kanban_objective } from "@repo/types";
import { useLang } from "@repo/language/hooks";

import { IShowHookProps } from "@/templates/show/types";

import { Data, Target } from "./tabs";

export const useTabs = ({ data }: IShowHookProps<project_kanban_objective>) => {
  const t = useLang();
  return [
    {
      title: t.page.project_kanban_objective("show.tabs.data"),
      value: "data",
      children: <Data />,
    },
    {
      title: t.page.project_kanban_objective("show.tabs.targets"),
      value: "targets",
      disabled: !data,
      children: <Target />,
    },
  ];
};
