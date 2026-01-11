import { Mail, Pen, Trash } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { TableAction } from "@repo/ui/app";

import { invite } from "@/api/generator/types";
import { useAccess } from "@/hooks/access";
import { IUseHookProps } from "@/templates/list/base/types";

export const useActions = ({ state, handleState, requests }: IUseHookProps<invite>) => {
  const { permissions } = useAccess();
  const perm = permissions();
  const t = useLang();

  const actions: TableAction<invite>[] = [
    {
      label: t.helper("edit"),
      icon: <Pen />,
      onClick: (item) => {
        handleState({ open: true, mode: "edit", item });
      },

      isDisabled: () => state.loadingLines.length > 0,
      isVisible: (item) => perm.update && !item.accepted,
    },
    {
      label: t.helper("resend"),
      icon: <Mail />,
      preOnClick: (item) => {
        handleState({ item });
      },
      onClick: (item) => {
        handleState({ loadingLines: [item.id] });
        requests.update?.mutate({
          accepted: null,
        });
      },
      isDisabled: () => state.loadingLines.length > 0,
      isVisible: (item) => perm.update && !item.accepted,
      confirmText: t.helper("confirm_resend"),
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
