import { Zap } from "lucide-react";

import { plan } from "@repo/types";
import { useLang } from "@repo/language/hook";

import { cn } from "@repo/ui";

import { IPlanCardProps } from "../types";
import { PlanCard } from "./plan";

export interface IPlanTab extends Omit<IPlanCardProps, "plan"> {
  plans: plan[];
}

export const Tab = ({
  plans,
  gridClassName = "grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3",
  ...rest
}: IPlanTab) => {
  const t = useLang();
  return (
    <>
      <div className={cn("mx-auto grid max-w-7xl", gridClassName)}>
        {plans?.map((plan) => (
          <PlanCard key={plan.id} {...rest} plan={plan} />
        ))}
      </div>

      {!plans.length && (
        <div className="px-4 py-8 text-center sm:py-10">
          <div className="text-gray-500 dark:text-gray-400">
            <Zap className="mx-auto mb-3 h-8 w-8 opacity-50 sm:h-10 sm:w-10" />
            <h3 className="mb-2 text-base font-semibold sm:text-lg">
              {t.page.plans("empty.title")}
            </h3>
            <p className="text-xs sm:text-sm">{t.page.plans("empty.description")}</p>
          </div>
        </div>
      )}
    </>
  );
};
