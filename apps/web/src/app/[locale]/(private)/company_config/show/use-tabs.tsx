import { company_config } from "@repo/types";
import { useLang } from "@repo/language/hook";

import { IShowHookProps } from "@/templates/show/types";

import { General } from "./tabs";

export const useTabs = (_: IShowHookProps<company_config>) => {
  const t = useLang();
  return [
    {
      title: t.page.company_config("show.tabs.general"),
      value: "general",
      children: <General />,
    },
  ];
};
