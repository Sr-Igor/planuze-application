import {
  project_allocation,
  project_kanban_cycle,
  project_kanban_cycle_allocation,
  project_kanban_cycle_card,
  project_kanban_cycle_card_type,
  project_kanban_cycle_column,
  project_tool,
} from "@repo/types";
import { AppLogsModal, ILogsComparison } from "@repo/ui-new";

import { useLogs } from "@/hooks/logs";

import { State } from "../../types";

export interface IModalLogsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  state: State;
}

export interface ILogsOptions {
  cycle: Partial<ILogsComparison<project_kanban_cycle>>;
  column: Partial<ILogsComparison<project_kanban_cycle_column>>;
  card: Partial<ILogsComparison<project_kanban_cycle_card>>;
  cardType: Partial<ILogsComparison<project_kanban_cycle_card_type>>;
  allocation: Partial<ILogsComparison<project_kanban_cycle_allocation>>;
  globalAllocation: Partial<ILogsComparison<project_allocation>>;
  tool: Partial<ILogsComparison<project_tool>>;
}

export const ModalLogs = ({ open, onOpenChange, state }: IModalLogsProps) => {
  const logKeys = useLogs();

  const options: ILogsOptions = {
    cycle: logKeys.project_kanban_cycle(),
    column: logKeys.project_kanban_cycle_column(),
    card: logKeys.project_kanban_cycle_card(),
    cardType: logKeys.project_kanban_cycle_card_type(),
    allocation: logKeys.project_kanban_cycle_allocation(),
    globalAllocation: logKeys.project_allocation(),
    tool: logKeys.project_tool(),
  };

  const getItem = () => {
    if (!state.type) return undefined;

    switch (state.type) {
      case "cycle":
        return state.cycle;
      case "column":
        return state.column;
      case "card":
        return state.card;
      case "cardType":
        return state.cardType;
      case "allocation":
        return state.allocation;
      case "member":
        return state.member;
      case "globalAllocation":
        return state.globalAllocation;
      case "tool":
        return state.tool;
      default:
        return undefined;
    }
  };

  const item = getItem();
  const logs = state.type ? options[state.type as keyof ILogsOptions] : undefined;

  if (!item || !logs) {
    return null;
  }

  return <AppLogsModal<any> open={open} onOpenChange={onOpenChange} data={item} logs={logs} />;
};
