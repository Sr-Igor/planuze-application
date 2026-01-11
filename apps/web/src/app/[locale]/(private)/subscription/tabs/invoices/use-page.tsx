import { CheckCircle, Clock, XCircle } from "lucide-react";

import { useLang } from "@repo/language/hook";

import { ITabProps } from "../types";

export const usePage = ({ subscriptions, isLoading }: ITabProps) => {
  const t = useLang();
  const invoices = subscriptions?.[0]?.company?.company_invoices || [];

  const statusMap: { [key: string]: { label: string; color: string; icon: React.ReactNode } } = {
    paid: {
      label: t.page.subscription("invoices.paid"),
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      icon: <CheckCircle className="mr-1.5 h-3.5 w-3.5" />,
    },
    pending: {
      label: t.page.subscription("invoices.unpaid"),
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      icon: <Clock className="mr-1.5 h-3.5 w-3.5" />,
    },
    failed: {
      label: t.page.subscription("invoices.failed"),
      color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      icon: <XCircle className="mr-1.5 h-3.5 w-3.5" />,
    },
  };

  return {
    invoices,
    isLoading,
    statusMap,
  };
};
