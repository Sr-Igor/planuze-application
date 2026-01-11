import { useLocale } from "next-intl";

import { useLang } from "@repo/language/hook";
import { Badge, CardTitle, Skeleton } from "@repo/ui";
import { Icon } from "@repo/ui/app";

import { plan } from "@/api/generator/types";
import { formatCurrency } from "@/utils/currency";

import { useUtilsPlan } from "../../hooks/use-utils-plan";

export interface IPlanHeader {
  isLoading: boolean;
  isCurrentUserPlan: boolean;
  isPopular: boolean;
  isFree: boolean;
  plan: plan;
}

export const Header = ({ isLoading, isCurrentUserPlan, isPopular, isFree, plan }: IPlanHeader) => {
  const t = useLang();

  const locale = useLocale();

  const { getBillingCycle } = useUtilsPlan();

  return (
    <>
      <div className="mb-2 flex justify-center sm:mb-3">
        {isLoading ? (
          <Skeleton className="h-10 w-10 rounded-full sm:h-12 sm:w-12" />
        ) : (
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full p-2 sm:h-12 sm:w-12 sm:p-2.5 ${
              isCurrentUserPlan
                ? isPopular
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                : isFree
                  ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                  : isPopular
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            <Icon name={plan.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        )}
      </div>
      {isCurrentUserPlan && (
        <Badge
          variant="default"
          className="absolute top-1 right-1 mb-2 flex self-center rounded-sm bg-blue-100 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200"
        >
          {t.page.plans("current_plan")}
        </Badge>
      )}
      {isLoading ? (
        <Skeleton className="h-5 w-20 self-center sm:h-6 sm:w-24" />
      ) : (
        <CardTitle className="text-lg font-bold sm:text-xl">{plan.title}</CardTitle>
      )}

      {isLoading ? (
        <Skeleton className="h-8 w-28 self-center sm:h-10 sm:w-32" />
      ) : (
        <div className="text-center">
          <span className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            {isFree ? t.page.plans("free") : formatCurrency(plan.price || 0, plan.currency, locale)}
          </span>
          {!isFree && (
            <span className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">
              {getBillingCycle(plan.billing_model)}
            </span>
          )}
          {plan.billing_model === "yearly" && (
            <div className="mt-1">
              <Badge
                variant="default"
                className="bg-gradient-to-r from-orange-500 to-red-500 px-1.5 py-0.5 text-xs text-white sm:px-2 sm:py-1"
              >
                💰 {t.page.plans("save_20")}
              </Badge>
            </div>
          )}
          <p className="text-foreground/60 dark:text-foreground/60 mt-5 text-[11px]">
            * {t.page.plans("price_note")}
          </p>
        </div>
      )}
    </>
  );
};
