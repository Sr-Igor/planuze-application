import { useLang } from "@repo/language/hook";

import { kanban_template } from "@/api/generator/types";
import { IShowHookProps } from "@/templates/show/types";

import { Card, Column, Data } from "./tabs";

export const useTabs = ({ data }: IShowHookProps<kanban_template>) => {
  const t = useLang();
  return [
    {
      title: t.page.kanban_template("show.tabs.data"),
      value: "data",
      children: <Data />,
    },
    {
      title: t.page.kanban_template("show.tabs.columns"),
      value: "columns",
      disabled: !data?.id,
      children: <Column />,
    },
    {
      title: t.page.kanban_template("show.tabs.cards"),
      value: "cards",
      disabled: !data?.id,
      children: <Card />,
    },
  ];
};
