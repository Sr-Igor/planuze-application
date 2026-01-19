import { useLang } from "@repo/language/hooks";
import { Badge, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";

import { AuthModal } from "@/app/[locale]/auth/login/modal";

import { ChangePlanModal } from "./components/change-modal";
import { Tab } from "./components/tab";
import { usePage } from "./hooks/use-page";
import { useReq } from "./hooks/use-req";
import { IPlanCardProps, IPlanTemplateProps } from "./types";

export const PlansTemplate = (props: IPlanTemplateProps) => {
  const t = useLang();

  const {
    activeTab,
    setActiveTab,
    monthlyPlans,
    yearlyPlans,
    isLoading,
    handleOpenChangePlanModal,
    setIsChangeModalOpen,
    isCurrentPlan,
    isSubscribed,
    isChangeModalOpen,
    planToChange,
    currentPlanObj,
    endDateFormatted,
    currentSubscription,
    isAuthModalOpen,
    setIsAuthModalOpen,
    user,
  } = usePage(props);

  const { checkout, portal, test, upgrade } = useReq();

  const cardProps: IPlanCardProps = {
    handleOpenChangePlanModal,
    isCurrentPlan,
    isLoading,
    isSubscribed,
    plan: props.plans[0],
    test: (id) => (!user ? setIsAuthModalOpen(true) : test.mutate(id)),
    manager: () => (!user ? setIsAuthModalOpen(true) : portal.mutate()),
    subscribe: (id) => (!user ? setIsAuthModalOpen(true) : checkout.mutate(id)),
    gridClassName: props.gridClassName,
    subscription: currentSubscription,
    isPending: portal.isPending || checkout.isPending || test.isPending || upgrade.isPending,
  };

  const handleConfirmChangePlan = () => {
    if (!planToChange) return;
    upgrade.mutate(planToChange.price_id || planToChange.id);
    setIsChangeModalOpen(false);
  };

  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="relative mx-auto grid w-full max-w-lg grid-cols-2">
          <TabsTrigger value="monthly" disabled={isLoading} className="text-sm">
            {t.page.plans("monthly")}
          </TabsTrigger>
          <TabsTrigger
            value="yearly"
            className="relative overflow-visible text-sm"
            disabled={isLoading}
          >
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span>{t.page.plans("yearly")}</span>
              <Badge
                variant="default"
                className="rounded-full border-0 bg-gradient-to-r from-orange-500 to-red-500 px-1 py-0.5 text-[8px] text-white shadow-md sm:px-1.5 sm:py-0.5 sm:text-[10px]"
              >
                -20%
              </Badge>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="mt-4 sm:mt-6">
          <Tab plans={monthlyPlans} {...cardProps} />
        </TabsContent>

        <TabsContent value="yearly" className="mt-4 sm:mt-6">
          <Tab plans={yearlyPlans} {...cardProps} />
        </TabsContent>
      </Tabs>

      <ChangePlanModal
        isOpen={isChangeModalOpen}
        onOpenChange={setIsChangeModalOpen}
        planToChange={planToChange}
        currentPlanObj={currentPlanObj}
        endDateFormatted={endDateFormatted}
        handleConfirmChangePlan={handleConfirmChangePlan}
        upgrade={upgrade}
      />

      <AuthModal isOpen={isAuthModalOpen} onOpenChange={setIsAuthModalOpen} />
    </>
  );
};
