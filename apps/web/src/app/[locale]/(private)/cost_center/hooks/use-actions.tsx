import { Eye, Pen, Trash } from "lucide-react";

import { cost_center } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { TableAction } from "@repo/ui/app";

import { useAccess } from "@/hooks/access";
import { IUseHookProps } from "@/templates/list/base/types";

export const useActions = ({ state, handleState }: IUseHookProps<cost_center>) => {
  const t = useLang();
  const { permissions } = useAccess();
  const perm = permissions();

  const actions: TableAction<cost_center>[] = [
    {
      label: perm.update ? t.helper("edit") : t.helper("show"),
      icon: perm.update ? <Pen /> : <Eye />,
      onClick: (item) => {
        handleState({ open: true, mode: "edit", item });
      },
      isDisabled: () => state.loadingLines.length > 0,
      isVisible: () => perm.update || perm.show,
    },
    {
      label: t.helper("delete"),
      variant: "destructive",
      separatorTop: true,
      icon: <Trash />,
      onClick: (item) => {
        handleState({ item, open: true, mode: "destroy" });
      },
      isDisabled: () => state.loadingLines.length > 0,
      isVisible: () => perm.destroy,
    },
  ];

  return { actions };
};
