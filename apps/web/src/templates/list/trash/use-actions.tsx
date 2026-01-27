import { ArchiveRestore } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { useUserAccess } from "@repo/redux/hooks";
import { TableAction } from "@repo/ui";

import { IUseHookProps } from "../base/types";

export const useActions = <T extends { id: string }>({ state, handleState }: IUseHookProps<T>) => {
  const t = useLang();
  const { permissions } = useUserAccess();
  const perm = permissions();

  const actions: TableAction<T>[] = [
    {
      label: t.helper("restore"),
      icon: <ArchiveRestore />,
      onClick: (item) => {
        handleState({ item, open: true, mode: "restore" });
      },
      isDisabled: () => state.loadingLines.length > 0,
      isVisible: () => perm.restore,
    },
  ];

  return { actions };
};
