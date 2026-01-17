import { integration } from "@repo/types";
import { useLang } from "@repo/language/hook";

import { IShowHookProps } from "@/templates/show/types";

import { Data, Permission } from "./tabs";

export const useTabs = ({ data }: IShowHookProps<integration>) => {
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
  ];
};
