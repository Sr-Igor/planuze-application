import { useRouter } from "next/navigation";

import { Eye, Pen, Trash } from "lucide-react";

import { level } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { TableAction } from "@repo/ui-new";

import { useAccess } from "@/hooks/access";
import { IUseHookProps } from "@/templates/list/base/types";

export const useActions = ({ state, handleState }: IUseHookProps<level>) => {
  const route = useRouter();
  const { permissions } = useAccess();
  const perm = permissions();
  const t = useLang();

  const actions: TableAction<level>[] = [
    {
      label: perm.update ? t.helper("edit") : t.helper("show"),
      icon: perm.update ? <Pen /> : <Eye />,
      onClick: (item) => {
        route.push(`/level/show/${item.id}`);
      },
      isDisabled: () => state.loadingLines.length > 0,
      isVisible: () => perm.update && perm.show,
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
      isVisible: (item) => perm.destroy && !item.administrator,
    },
  ];

  return { actions };
};
