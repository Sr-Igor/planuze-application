import { plan, subscription } from "@repo/api/generator/types";

export interface IPlanTemplateProps {
  plans: plan[];
  subscriptions: subscription[];
  isLoading: boolean;
  gridClassName?: string;
}

export interface FeaturesByModule {
  id: string;
  title: string;
  icon?: string | null;
  order?: number;
  features: { title: string; order?: number }[];
}

export interface IPlanCardProps {
  plan: plan;
  isLoading: boolean;
  isPending: boolean;
  isSubscribed: boolean;
  gridClassName?: string;
  subscription: subscription;
  test: (id: string) => void;
  manager: () => void;
  subscribe: (id: string) => void;
  isCurrentPlan: (plan: plan) => boolean;
  handleOpenChangePlanModal: (plan: plan) => void;
}
