import { useLang } from "@repo/language/hook";

import { client } from "@/api/generator/types";
import { IShowHookProps } from "@/templates/show/types";

import { Address, BankAccount, Contact, Data, Document, File } from "./tabs";

export const useTabs = ({ data }: IShowHookProps<client>) => {
  const t = useLang();
  return [
    {
      title: t.page.client("show.tabs.data"),
      value: "data" as const,
      children: <Data />,
    },
    {
      title: t.page.client("show.tabs.documents"),
      value: "documents" as const,
      disabled: !data,
      children: <Document />,
    },
    {
      title: t.page.client("show.tabs.contacts"),
      value: "contacts" as const,
      disabled: !data,
      children: <Contact />,
    },
    {
      title: t.page.client("show.tabs.address"),
      value: "address" as const,
      disabled: !data,
      children: <Address />,
    },
    {
      title: t.page.client("show.tabs.bank_account"),
      value: "bank_account" as const,
      disabled: !data,
      children: <BankAccount />,
    },
    {
      title: t.page.client("show.tabs.files"),
      value: "files" as const,
      disabled: !data,
      children: <File />,
    },
  ];
};
