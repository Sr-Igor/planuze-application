import { plan, subscription } from "@repo/types";

export interface ITabProps {
  plans: plan[];
  subscriptions: subscription[];
  isLoading: boolean;
}
