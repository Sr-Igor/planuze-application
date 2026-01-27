import { useRouter } from "next/navigation";

import { Eye, Pen, Trash } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { useUserAccess } from "@repo/redux/hooks";
import { integration } from "@repo/types";
import { TableAction } from "@repo/ui";

import { IUseHookProps } from "@/templates/list/base/types";

export const useActions = ({ state, handleState }: IUseHookProps<integration>) => {
  const route = useRouter();
  const { permissions } = useUserAccess();
  const perm = permissions();
  const t = useLang();

  const actions: TableAction<integration>[] = [
    {
      label: perm.update ? t.helper("edit") : t.helper("show"),
      icon: perm.update ? <Pen /> : <Eye />,
      onClick: (item) => {
        route.push(`/integration/show/${item.id}`);
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
      isVisible: (item) => perm.destroy,
    },
  ];

  return { actions };
};
