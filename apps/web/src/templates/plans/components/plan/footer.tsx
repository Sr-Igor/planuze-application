import { useLang } from "@repo/language/hooks";
import { Button, Skeleton } from "@repo/ui";

import { Permission } from "@/components/permission";

import { IPlanCardProps } from "../../types";

export interface IPlanFooter extends IPlanCardProps {
  isFree: boolean;
  isPopular: boolean;
  isCurrentUserPlan: boolean;
}
export const Footer = ({
  isLoading,
  isSubscribed,
  isCurrentUserPlan,
  isFree,
  plan,
  manager,
  test,
  subscribe,
  handleOpenChangePlanModal,
  isPopular,
  isPending,
  subscription,
}: IPlanFooter) => {
  const t = useLang();

  const BillingNow = () => {
    const Root = ({ children }: { children: React.ReactNode }) =>
      subscription ? (
        <Permission permission={["show"]} feature="subscription">
          {children}
        </Permission>
      ) : (
        children
      );

    return (
      <Root>
        <Button
          onClick={() =>
            plan.price === 0 ? test(plan.price_id || plan.id) : subscribe(plan.price_id || plan.id)
          }
          className={`h-9 w-full text-sm sm:h-10 ${
            isFree
              ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              : isPopular
                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                : ""
          }`}
          disabled={isPending || (!plan.price_id && !isFree)}
          loading={isPending}
        >
          {isFree ? t.page.plans("start_free") : t.page.plans("subscribe_now")}
        </Button>
      </Root>
    );
  };

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-9 w-full sm:h-10" />
      ) : (
        <>
          {isSubscribed && isCurrentUserPlan ? (
            <Permission permission={["show"]} feature="subscription">
              <Button
                onClick={manager}
                variant="outline"
                className="h-9 w-full text-sm sm:h-10"
                disabled={isFree}
                loading={isPending}
              >
                {isFree ? t.page.plans("active_period") : t.page.plans("manage_subscription")}
              </Button>
            </Permission>
          ) : isSubscribed && !isCurrentUserPlan && !isFree ? (
            <Permission permission={["update"]} feature="subscription">
              <Button
                onClick={() => {
                  subscription.is_test
                    ? subscribe(plan.price_id || plan.id)
                    : handleOpenChangePlanModal(plan);
                }}
                variant="outline"
                className="h-9 w-full text-sm sm:h-10"
                disabled={isPending || !plan.price_id}
                loading={isPending}
              >
                {t.page.plans("change_plan")}
              </Button>
            </Permission>
          ) : (
            <BillingNow />
          )}
        </>
      )}
    </>
  );
};
