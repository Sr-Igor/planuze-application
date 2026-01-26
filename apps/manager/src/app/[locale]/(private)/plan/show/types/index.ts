import { plan } from "@repo/types";

export type TabType = "data" | "modules";

export interface State {
  tab: TabType;
  action?: string;
  dirty?: boolean;
  loading?: boolean;
  cancel?: boolean;
  delete?: boolean;
}

export interface PlanShowContextType {
  data?: plan;
  state: State;
  handleState: (obj: Partial<State>) => void;
}

export interface PlanHeaderProps {
  id: string;
  isLoading: boolean;
  title: string;
  description: string;
}

export interface PlanTabsProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  isDirty: boolean;
  hasData: boolean;
  tabs: Array<{
    title: string;
    value: TabType;
    disabled?: boolean;
    children: React.ReactNode;
  }>;
}

export interface PlanDeleteDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
  title: string;
  description: string;
  confirmText: string;
}

export interface PlanCancelDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description: string;
  confirmText: string;
}
