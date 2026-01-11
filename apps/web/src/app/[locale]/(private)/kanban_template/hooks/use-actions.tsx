import { useRouter } from "next/navigation";

import { BookCopy, Eye, Pen, Trash } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { TableAction } from "@repo/ui/app";

import { kanban_template } from "@/api/generator/types";
import { useAccess } from "@/hooks/access";
import { IUseHookProps } from "@/templates/list/base/types";

export const useActions = ({ state, handleState }: IUseHookProps<kanban_template>) => {
  const route = useRouter();
  const { permissions } = useAccess();
  const perm = permissions();
  const t = useLang();

  const actions: TableAction<kanban_template>[] = [
    {
      label: perm.update ? t.helper("edit") : t.helper("show"),
      icon: perm.update ? <Pen /> : <Eye />,
      onClick: (item) => {
        route.push(`/kanban_template/show/${item.id}`);
      },
      isDisabled: () => state.loadingLines.length > 0,
      isVisible: () => perm.update && perm.show,
    },
    {
      label: t.helper("clone"),
      icon: <BookCopy />,
      onClick: (item) => {
        handleState({ open: true, mode: "clone", item });
      },
      isDisabled: () => state.loadingLines.length > 0,
      isVisible: () => perm.store,
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
