import { plan } from "@repo/types";
import { useLang } from "@repo/language/hooks";
import { Badge } from "@repo/ui";

import { FeaturesByModule } from "../types";

export const useUtilsPlan = () => {
  const t = useLang();

  const getBillingCycle = (billingModel: string) => {
    switch (billingModel) {
      case "monthly":
        return t.page.plans("cycle.monthly");
      case "yearly":
        return t.page.plans("cycle.yearly");
      case "quarterly":
        return t.page.plans("cycle.quarterly");
      default:
        return "";
    }
  };

  const getPopularBadge = (plan: any, isCurrentUserPlan: boolean) => {
    if (!plan?.price && plan?.free_test > 0 && !isCurrentUserPlan) {
      return (
        <Badge
          variant="default"
          className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 transform bg-gradient-to-r from-green-500 to-emerald-500 px-2 py-1 text-xs text-white"
        >
          {t.page.plans("no_card")}
        </Badge>
      );
    }

    if (plan.is_popular && !isCurrentUserPlan) {
      return (
        <Badge
          variant="default"
          className="absolute -top-2 left-1/2 z-10 -translate-x-1/2 transform bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-1 text-xs text-white"
        >
          {t.page.plans("most_popular")}
        </Badge>
      );
    }
    return null;
  };

  const sortPlans = (plans: any[]) => {
    return [...plans].sort((a, b) => {
      if (a.price === 0 && b.price !== 0) return -1;
      if (b.price === 0 && a.price !== 0) return 1;
      if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
      return 0;
    });
  };

  const filterPlansByBilling = (plans: any[], billingType: string) => {
    if (!plans) return [];

    const filtered = plans.filter((plan) => {
      if (billingType === "monthly") {
        return plan.billing_model === "monthly" || plan.price === 0;
      }
      if (billingType === "yearly") {
        return plan.billing_model === "yearly" && plan.price > 0;
      }
      return true;
    });

    return sortPlans(filtered);
  };

  const getFeaturesByModule = (plan: plan): FeaturesByModule[] => {
    if (!plan.plan_features) return [];

    const filtered = plan.plan_features.filter((pf: any) => pf.feature && pf.feature.show_plan);

    const modulesMap: Record<
      string,
      {
        id: string;
        title: string;
        icon?: string | null;
        order?: number;
        features: { title: string; order?: number }[];
      }
    > = {};
    filtered.forEach((pf: any) => {
      const feature = pf.feature;
      if (!feature || !feature.module) return;
      const moduleId = feature.module.id;
      if (!modulesMap[moduleId]) {
        modulesMap[moduleId] = {
          id: moduleId,
          title: feature.module.title,
          icon: feature.module.icon,
          order: feature.module.order,
          features: [],
        };
      }
      modulesMap[moduleId].features.push({ title: feature.plan_title, order: feature.order });
    });

    Object.values(modulesMap).forEach((mod) => {
      mod.features.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    });

    return Object.values(modulesMap).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  };

  return {
    getBillingCycle,
    getPopularBadge,
    filterPlansByBilling,
    getFeaturesByModule,
  };
};
