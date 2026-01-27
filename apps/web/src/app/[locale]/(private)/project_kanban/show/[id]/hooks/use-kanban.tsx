"use client";

import { useCallback, useState } from "react";

import { ChartLine, ClipboardList, LayoutList, Logs } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { useUserAccess } from "@repo/redux/hooks";

import { IUseKanbanReturnProps, Mode, State, Viewer } from "../types";

export const useKanban = (): IUseKanbanReturnProps => {
  const t = useLang();
  const { permissions } = useUserAccess();

  const viewers: Viewer[] = [
    {
      icon: ClipboardList,
      value: "principal",
      tooltip: t.tooltip("general_cards"),
      isVisible: permissions("project_kanban_cycle").index,
    },
    {
      icon: LayoutList,
      value: "tasks",
      tooltip: t.tooltip("tasks_cards"),
      isVisible: permissions("project_kanban_cycle").index,
    },
    {
      icon: Logs,
      value: "list",
      tooltip: t.tooltip("list_cards"),
      isVisible: permissions("project_kanban_cycle_card").index,
    },
    {
      icon: ChartLine,
      value: "reports",
      tooltip: t.tooltip("reports_cards"),
      isVisible: permissions("project_kanban_report").index,
    },
  ];

  const [state, setState] = useState<State>({});

  const isOpen = useCallback(
    (type: State["type"], modes: Mode[]) =>
      state.type === type && modes.some((mode) => state.modes?.includes(mode)),
    [state]
  );

  const handleClose = (modes: Mode[], s: Partial<State> = {}) => {
    setState((prev) => ({
      ...prev,
      ...s,
      modes: prev.modes?.filter((mode) => !modes.includes(mode)),
      forcedMode: undefined,
    }));
  };

  const handleState = (s: Partial<State>, resetModes?: boolean) => {
    setState((prev) => ({
      ...prev,
      ...s,
      modes: resetModes ? s.modes : [...(prev.modes || []), ...(s.modes || [])],
    }));
  };

  return {
    handleClose,
    state,
    isOpen,
    setState,
    viewers,
    handleState,
  };
};
