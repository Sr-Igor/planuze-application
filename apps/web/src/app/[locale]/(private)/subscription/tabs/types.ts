import { plan, subscription } from "@repo/api/generator/types";

export interface ITabProps {
  plans: plan[];
  subscriptions: subscription[];
  isLoading: boolean;
}
