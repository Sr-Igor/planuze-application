import { useLocale } from "next-intl";

import { Clock, FileText } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Badge, Card, Skeleton } from "@repo/ui";
import { CardFlag } from "@repo/ui/app";

import { useIntlFormat } from "@/hooks/intl-format";
import { formatCurrency } from "@/utils/currency";

import { ITabProps } from "../types";
import { usePage } from "./use-page";

export const Invoices = (props: ITabProps) => {
  const t = useLang();
  const { dates } = useIntlFormat();
  const locale = useLocale();
  const { statusMap, invoices, isLoading } = usePage(props);

  return (
    <>
      {!invoices.length && (
        <div className="flex h-full flex-col items-center justify-center px-4">
          <FileText className="mb-3 h-10 w-10 text-gray-400" />
          <h3 className="text-center text-lg font-semibold text-gray-800 dark:text-gray-200">
            {t.page.subscription("empty.invoice.title")}
          </h3>
          <p className="text-center text-sm text-gray-500">
            {t.page.subscription("empty.invoice.description")}
          </p>
        </div>
      )}
      {!!invoices.length && (
        <div className="grid grid-cols-1 gap-4 px-4 sm:gap-6 sm:px-5">
          {invoices?.map((invoice) => {
            const statusInfo = statusMap[invoice.status || ""] || {
              label: "Unknown",
              color: "bg-gray-100 text-gray-800",
              icon: null,
            };
            const flag = invoice.flag_card?.toLowerCase();
            return (
              <Card
                key={invoice.id}
                className="bg-sidebar flex min-h-0 flex-col justify-between gap-4 rounded-2xl border-0 p-4 sm:p-6 md:flex-row"
              >
                {isLoading ? (
                  <Skeleton className="h-28 w-full" />
                ) : (
                  <>
                    <div className="flex flex-1 flex-col gap-3 sm:gap-4">
                      {/* Header with card info and status */}
                      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                        <div className="flex items-center gap-2">
                          <CardFlag brand={flag} width={44} height={22} />
                          <span className="truncate text-sm font-semibold text-gray-700 sm:text-base dark:text-gray-200">
                            {invoice.last_digits ? `•••• ${invoice.last_digits}` : "••••••••••••"}
                          </span>
                        </div>
                        <Badge
                          className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs shadow-sm sm:px-3 sm:text-base ${statusInfo.color} self-start sm:self-auto`}
                        >
                          {statusInfo.icon}
                          <span className="font-bold">{statusInfo.label}</span>
                        </Badge>
                      </div>

                      {/* Title and description */}
                      <div className="flex flex-col gap-1 sm:gap-2 md:flex-row md:items-center md:gap-4">
                        <span className="truncate text-base font-bold sm:text-lg">
                          {invoice.title || "-"}
                        </span>
                        <span className="text-muted-foreground truncate text-xs sm:text-sm">
                          {invoice.description || "-"}
                        </span>
                      </div>
                    </div>

                    {/* Price and date section */}
                    <div className="flex flex-row items-center justify-between gap-3 sm:min-w-[160px] sm:flex-col sm:items-end">
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">
                          {dates.format(new Date(invoice.createdAt))}
                        </span>
                        <span className="sm:hidden">
                          {dates.format(new Date(invoice.createdAt))}
                        </span>
                      </span>
                      <span className="text-xl font-extrabold whitespace-nowrap sm:text-2xl">
                        {formatCurrency(
                          invoice.value || 0,
                          invoice.currency?.toUpperCase() || "BRL",
                          locale
                        )}
                      </span>
                    </div>
                  </>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};
