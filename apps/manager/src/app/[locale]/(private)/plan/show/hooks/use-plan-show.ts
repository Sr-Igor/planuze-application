import { useState } from "react";

import { usePlan } from "@repo/api/manager";

import { State, TabType } from "../types";

export function useAdminPlanShow(id: string) {
  const [state, setState] = useState<State>({
    tab: "data",
  });

  const handleState = (obj: Partial<State>) => {
    setState((prev) => ({ ...prev, ...obj }));
  };

  const { show } = usePlan({
    enabledShow: !!id,
    id,
  });

  const handleTabChange = (tab: TabType) => {
    if (state.dirty) {
      handleState({ cancel: true, action: tab });
      return;
    }
    handleState({ tab, dirty: false });
  };

  return {
    state,
    setState: handleState,
    show,
    handleTabChange,
  };
}
