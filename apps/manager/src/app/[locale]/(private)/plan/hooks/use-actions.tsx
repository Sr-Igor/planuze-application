import { useRouter } from "next/navigation";

import { Pen } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { plan } from "@repo/types";
import { TableAction } from "@repo/ui";

import { IUseTableProps } from "../types";

export const useActions = ({ loadingLines }: IUseTableProps) => {
  const route = useRouter();

  const t = useLang();

  const actions: TableAction<plan>[] = [
    {
      label: t.helper("edit"),
      icon: <Pen />,
      onClick: (item) => {
        route.push(`/plan/show/${item.id}`);
      },
      isDisabled: () => loadingLines.length > 0,
    },
  ];

  return {
    actions,
  };
};
