import { Eye, Pen, Trash } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { useUserAccess } from "@repo/redux/hooks";
import { kanban_template_tag } from "@repo/types";
import { TableAction } from "@repo/ui";

import { IUseHookProps } from "@/templates/list/base/types";

export const useActions = ({ state, handleState }: IUseHookProps<kanban_template_tag>) => {
  const t = useLang();
  const { permissions } = useUserAccess();

  const perm = permissions();

  const actions: TableAction<kanban_template_tag>[] = [
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
