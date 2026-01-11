import { profile } from "@repo/api/generator/types";
import { useLang } from "@repo/language/hook";

import { IShowHookProps } from "@/templates/show/types";

import { Address, BankAccount, Contact, Data, Document, File, Role } from "./tabs";
import { Bonus } from "./tabs/bonus";

export const useTabs = ({ data }: IShowHookProps<profile>) => {
  const t = useLang();
  return [
    {
      title: t.page.profile("show.tabs.data"),
      value: "data",
      disabled: !data,
      children: <Data />,
    },
    {
      title: t.page.profile("show.tabs.role"),
      value: "role",
      disabled: !data,
      children: <Role />,
    },
    {
      title: t.page.profile("show.tabs.bonus"),
      value: "bonus",
      disabled: !data,
      children: <Bonus />,
    },
    {
      title: t.page.profile("show.tabs.documents"),
      value: "documents",
      disabled: !data,
      children: <Document />,
    },
    {
      title: t.page.profile("show.tabs.contacts"),
      value: "contacts",
      disabled: !data,
      children: <Contact />,
    },
    {
      title: t.page.profile("show.tabs.address"),
      value: "address",
      disabled: !data,
      children: <Address />,
    },
    {
      title: t.page.profile("show.tabs.bank_account"),
      value: "bank_account",
      disabled: !data,
      children: <BankAccount />,
    },
    {
      title: t.page.profile("show.tabs.files"),
      value: "files",
      disabled: !data,
      children: <File />,
    },
  ];
};
