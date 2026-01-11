import { level } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";

import { IShowHookProps } from "@/templates/show/types";

import { Data, Permission, User } from "./tabs";

export const useTabs = ({ data }: IShowHookProps<level>) => {
  const t = useLang();
  return [
    {
      title: t.page.level("show.tabs.data"),
      value: "data" as const,
      children: <Data />,
    },
    {
      title: t.page.level("show.tabs.permission"),
      value: "permission" as const,
      disabled: !data,
      children: <Permission />,
    },
    {
      title: t.page.level("show.tabs.user"),
      value: "user" as const,
      disabled: !data,
      children: <User />,
    },
  ];
};
