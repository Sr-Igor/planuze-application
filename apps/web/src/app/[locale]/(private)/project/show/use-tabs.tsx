import { project } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";

import { IShowHookProps } from "@/templates/show/types";

import {
  Allocation,
  Config,
  Data,
  Financial,
  FinancialEmployees,
  Member,
  Tool,
  Version,
} from "./tabs";

export const useTabs = ({ data, getPermissions }: IShowHookProps<project>) => {
  const t = useLang();

  return [
    {
      title: t.page.project("show.tabs.data"),
      value: "data",
      invisible: !getPermissions("project").show,
      children: <Data />,
    },
    {
      title: t.page.project("show.tabs.version"),
      value: "version",
      invisible: !getPermissions("project_version").index,
      disabled: !data?.id,
      children: <Version />,
    },
    {
      title: t.page.project("show.tabs.financial"),
      value: "financial",
      invisible: !getPermissions("project_financial").index,
      disabled: !data?.id,
      children: <Financial />,
    },
    {
      title: t.page.project("show.tabs.financial_employees"),
      value: "financial_employees",
      invisible: !getPermissions("project_financial_employees").index,
      disabled: !data?.id,
      children: <FinancialEmployees />,
    },
    {
      title: t.page.project("show.tabs.member"),
      value: "member",
      invisible: !getPermissions("project_member").index,
      disabled: !data?.id,
      children: <Member />,
    },
    {
      title: t.page.project("show.tabs.tool"),
      value: "tool",
      invisible: !getPermissions("project_tool").index,
      disabled: !data?.id,
      children: <Tool />,
    },
    {
      title: t.page.project("show.tabs.allocation"),
      value: "allocation",
      invisible: !getPermissions("project_allocation").index,
      disabled: !data?.id,
      children: <Allocation />,
    },
    {
      title: t.page.project("show.tabs.config"),
      value: "config",
      invisible: !getPermissions("project_config").index,
      disabled: !data?.id,
      children: <Config />,
    },
  ];
};
