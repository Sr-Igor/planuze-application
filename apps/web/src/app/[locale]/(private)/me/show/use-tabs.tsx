import { profile } from "@repo/types";
import { useLang } from "@repo/language/hooks";

import { IShowHookProps } from "@/templates/show/types";

import { Address, BankAccount, Bonus, Contact, Data, Document, File, Role } from "./tabs";

export const useTabs = ({ data }: IShowHookProps<profile>) => {
  const t = useLang();
  return [
    {
      title: t.page.me("show.tabs.data"),
      value: "data",
      disabled: !data,
      children: <Data />,
    },
    {
      title: t.page.me("show.tabs.role"),
      value: "role",
      disabled: !data,
      children: <Role />,
    },
    {
      title: t.page.me("show.tabs.bonus"),
      value: "bonus",
      disabled: !data,
      children: <Bonus />,
    },
    {
      title: t.page.me("show.tabs.documents"),
      value: "documents",
      disabled: !data,
      children: <Document />,
    },
    {
      title: t.page.me("show.tabs.contacts"),
      value: "contacts",
      disabled: !data,
      children: <Contact />,
    },
    {
      title: t.page.me("show.tabs.address"),
      value: "address",
      disabled: !data,
      children: <Address />,
    },
    {
      title: t.page.me("show.tabs.bank_account"),
      value: "bank_account",
      disabled: !data,
      children: <BankAccount />,
    },
    {
      title: t.page.me("show.tabs.file"),
      value: "file",
      disabled: !data,
      children: <File />,
    },
  ];
};
