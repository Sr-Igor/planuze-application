import { company } from "@repo/types";
import { useLang } from "@repo/language/hooks";

import { useAuth } from "@repo/redux/hook";
import { IShowHookProps } from "@/templates/show/types";

import { Address, Contact, Data, Document, File, Owner } from "./tabs";

export const useTabs = ({ data }: IShowHookProps<company>) => {
  const { profile } = useAuth();

  const t = useLang();
  return [
    {
      title: t.page.company("show.tabs.data"),
      value: "data" as const,
      children: <Data />,
    },
    {
      title: t.page.company("show.tabs.documents"),
      value: "documents" as const,
      disabled: !data,
      children: <Document />,
    },
    {
      title: t.page.company("show.tabs.contacts"),
      value: "contacts" as const,
      disabled: !data,
      children: <Contact />,
    },
    {
      title: t.page.company("show.tabs.address"),
      value: "address" as const,
      disabled: !data,
      children: <Address />,
    },
    {
      title: t.page.company("show.tabs.files"),
      value: "files" as const,
      disabled: !data,
      children: <File />,
    },
    {
      title: t.page.company("show.tabs.owner"),
      value: "owner" as const,
      disabled: !data,
      children: <Owner />,
      invisible: !profile?.owner,
    },
  ];
};
