import { useLocale } from "next-intl";

import { subscription, subscription_plan } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";
import { Badge, CardDescription, CardTitle, Skeleton } from "@repo/ui";
import { Icon } from "@repo/ui";

import { useUtilsPlan } from "@/templates/plans/hooks/use-utils-plan";
import { formatCurrency } from "@repo/utils/currency";

export interface IHeaderProps {
  isLoading: boolean;
  plan: subscription_plan;
  subscription: subscription;
  statusInfo: {
    label: string;
    color: string;
  };
  customDescription: string | null;
}

export const Header = ({
  isLoading,
  plan,
  subscription,
  statusInfo,
  customDescription,
}: IHeaderProps) => {
  const t = useLang();

  const locale = useLocale();

  const { dates } = useIntlFormat();

  const { getBillingCycle } = useUtilsPlan();

  return (
    <div className="relative flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
      <div className="w-full">
        <CardTitle className="bg-sidebar-accent/60 flex h-auto min-h-[100px] items-center justify-between gap-3 rounded-lg p-3 text-2xl font-extrabold max-sm:flex-col sm:h-28 sm:p-4 sm:text-3xl">
          {isLoading ? (
            <Skeleton className="h-14 w-full" />
          ) : (
            <>
              <div className="flex items-center gap-2 sm:gap-3">
                {plan.icon && (
                  <span className="inline-flex items-center justify-center">
                    <Icon
                      name={plan.icon}
                      className="h-6 w-6 text-gray-600 sm:h-8 sm:w-8 dark:text-gray-300"
                    />
                  </span>
                )}
                <div>
                  <p className="text-[9px] font-semibold text-gray-600 sm:text-[10px] dark:text-gray-300">
                    {t.page.subscription("header.title")}:
                  </p>
                  <p className="text-lg font-bold sm:text-2xl">{plan.title}</p>
                </div>
                <Badge
                  className={`${statusInfo.color} hidden rounded-full px-3 py-0 text-xs sm:px-5 sm:text-sm md:block`}
                >
                  {statusInfo.label}
                </Badge>
              </div>

              <div className="flex min-w-[140px] flex-col items-end gap-1 max-sm:items-start sm:min-w-[160px] sm:gap-2">
                <span className="flex items-baseline gap-1 text-xl font-extrabold sm:gap-2 sm:text-2xl md:text-4xl">
                  {formatCurrency(plan.price || 0, plan.currency, locale)}
                  <span className="text-xs font-normal text-gray-500 sm:text-sm md:text-base dark:text-gray-400">
                    {getBillingCycle(plan.billing_model)}
                  </span>
                </span>

                <CardDescription className="mt-1 text-[10px] font-semibold text-gray-600 sm:text-[12px] dark:text-gray-300">
                  {customDescription ||
                    (subscription.end_date &&
                      !subscription.cancel_at_period_end &&
                      t.page.subscription("header.next_billing", {
                        date: dates.formatDate(new Date(subscription.end_date)),
                      }))}
                </CardDescription>
              </div>
            </>
          )}
        </CardTitle>
      </div>
    </div>
  );
};
