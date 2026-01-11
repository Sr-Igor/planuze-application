import { Eye, Pen, Trash } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { TableAction } from "@repo/ui/app";

import { role } from "@/api/generator/types";
import { useAccess } from "@/hooks/access";
import { IUseHookProps } from "@/templates/list/base/types";

export const useActions = ({ state, handleState }: IUseHookProps<role>) => {
  const t = useLang();
  const { permissions } = useAccess();
  const perm = permissions();

  const actions: TableAction<role>[] = [
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
