import { useState } from "react";

import { CreditCard, History } from "lucide-react";

import { subscription } from "@repo/types";
import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";

import { useSubscription } from "@repo/api/web/callers/subscription";
import { Permission } from "@/components/ui/permission";
import { useShow } from "@/templates/show/context";

import { HistoryModal } from "./history";

export interface IManagerProps {
  subscription: subscription;
  isLoading: boolean;
}

export const Manager = ({ subscription, isLoading }: IManagerProps) => {
  const t = useLang();

  const { handleState } = useShow();

  const [isOpen, setIsOpen] = useState(false);

  const { portal } = useSubscription({
    callbacks: {
      portal: {
        onSuccess: (data) => (window.location.href = data.url),
      },
    },
  });

  const inactiveSubscription = subscription?.status === "deleted" || subscription?.is_test;

  return (
    <>
      <div className="space-y-3 sm:space-y-4">
        <h3 className="mb-2 pl-2 text-sm font-semibold">{t.page.subscription("manager.title")}</h3>

        <Permission permission={["show"]} feature="subscription">
          <div className="bg-sidebar-accent/60 rounded-lg p-3 sm:p-4">
            <p className="text-muted-foreground mb-2 text-xs sm:mb-3 sm:text-sm">
              {t.page.subscription("manager.toggler.title")}
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                inactiveSubscription ? handleState({ tab: "plans" }) : portal.mutate();
              }}
              className="w-full justify-start py-2.5 text-sm font-semibold sm:py-3"
              loading={portal.isPending || isLoading}
            >
              <CreditCard className="mr-2 h-4 w-4 max-sm:hidden sm:h-5 sm:w-5" />
              {t.page.subscription("manager.toggler.label")}
            </Button>
          </div>
        </Permission>
        <div className="bg-sidebar-accent/60 rounded-lg p-3 sm:p-4">
          <p className="text-muted-foreground mb-2 text-xs sm:mb-3 sm:text-sm">
            {t.page.subscription("manager.history.title")}
          </p>
          <Button
            variant="secondary"
            onClick={() => setIsOpen(true)}
            className="w-full justify-start py-2.5 text-sm font-semibold sm:py-3"
            loading={isLoading}
          >
            <History className="mr-2 h-4 w-4 max-sm:hidden sm:h-5 sm:w-5" />
            {t.page.subscription("manager.history.label")}
          </Button>
        </div>
      </div>
      <HistoryModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        subscriptionChanges={subscription?.company?.subscription_changes || []}
      />
    </>
  );
};
