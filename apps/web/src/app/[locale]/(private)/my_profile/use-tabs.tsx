import { useLang } from "@repo/language/hook";

import { user } from "@/api/generator/types";
import { IShowHookProps } from "@/templates/show/types";

import { Company, Data, Password, TwoFactor } from "./tabs";

export const useTabs = (_: IShowHookProps<user>) => {
  const t = useLang();
  return [
    {
      title: t.page.my_profile("show.tabs.data"),
      value: "data",
      children: <Data />,
    },
    {
      title: t.page.my_profile("show.tabs.company"),
      value: "company",
      children: <Company />,
    },
    {
      title: t.page.my_profile("show.tabs.two_factor"),
      value: "two_factor",
      children: <TwoFactor />,
    },
    {
      title: t.page.my_profile("show.tabs.password"),
      value: "password",
      children: <Password />,
    },
  ];
};
