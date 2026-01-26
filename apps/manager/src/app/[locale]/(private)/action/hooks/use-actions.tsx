import { Pen } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { action } from "@repo/types";
import { TableAction } from "@repo/ui";

import { IUseTableProps } from "../types";

export const useActions = ({ handleState }: IUseTableProps) => {
  const t = useLang();

  const actions: TableAction<action>[] = [
    {
      label: t.helper("edit"),
      icon: <Pen />,
      onClick: (item) => {
        handleState({ open: true, mode: "edit", item });
      },
    },
  ];

  return {
    actions,
  };
};
