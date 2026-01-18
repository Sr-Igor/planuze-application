import { useLocale } from "next-intl";

import { AlertCircle, BadgeDollarSign, ClockAlert } from "lucide-react";

import { plan, subscription } from "@repo/types";
import { useLang , useIntlFormat } from "@repo/language/hooks";

import { formatCurrency } from "@repo/utils/currency";

export interface IWarningProps {
  subscription: subscription;
  currentPlanObj?: plan;
  isPriceChanged: boolean;
  scheduledDowngrade: {
    from: string;
    to: string;
    date: string;
  } | null;
}

export const Warning = ({
  subscription,
  currentPlanObj,
  isPriceChanged,
  scheduledDowngrade,
}: IWarningProps) => {
  const t = useLang();
  const locale = useLocale();
  const { dates } = useIntlFormat();
  const cancel = !!subscription.cancel_at_period_end && !!subscription.end_date;
  const isDeleted = subscription.status === "deleted";

  return (
    <div className="px-6">
      {cancel && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border bg-red-600 px-2 py-3 text-sm text-white">
          <AlertCircle className="mr-2 h-4 w-4" />
          {isDeleted
            ? t.page.subscription("warning.canceled")
            : t.page.subscription("warning.cancel_at_period_end", {
                date: dates.format(new Date(subscription.end_date!)),
              })}
        </div>
      )}

      {isPriceChanged && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-blue-400 bg-blue-400/20 px-2 py-3 text-sm text-blue-400">
          <BadgeDollarSign className="size-4" />
          <b>
            {t.page.subscription("warning.price_change", {
              date: subscription?.end_date && dates.formatDate(new Date(subscription?.end_date)),
              old_price: formatCurrency(
                subscription?.subscription_plan?.price || 0,
                subscription?.subscription_plan?.currency || "BRL",
                locale
              ),
              new_price:
                currentPlanObj?.price &&
                formatCurrency(
                  currentPlanObj?.price || 0,
                  currentPlanObj?.currency || "BRL",
                  locale
                ),
            })}
          </b>
        </div>
      )}
      {scheduledDowngrade && (
        <div className="mb-6 flex items-center gap-2 rounded-lg border border-amber-400 bg-amber-400/20 px-2 py-3 text-sm text-amber-400">
          <ClockAlert className="size-4" />
          <b>
            {t.page.subscription("warning.scheduled_downgrade", {
              from: scheduledDowngrade?.from,
              to: scheduledDowngrade?.to,
              date: scheduledDowngrade?.date && dates.format(new Date(scheduledDowngrade?.date)),
            })}
          </b>
        </div>
      )}
    </div>
  );
};
