"use client";

import { Card, CardContent, CardHeader } from "@repo/ui";

import { ITabProps } from "../types";
import { Empty, Header, Manager, Resources, Warning } from "./components";
import { usePage } from "./use-page";

export const Current = (props: ITabProps) => {
  const {
    plan,
    isLoading,
    statusInfo,
    subscription,
    isPriceChanged,
    currentPlanObj,
    groupedFeatures,
    customDescription,
    scheduledDowngrade,
  } = usePage(props);

  if (!plan) return <Empty />;

  return (
    <>
      <Card className="gap-0 border-none p-0">
        <Warning
          subscription={subscription}
          currentPlanObj={currentPlanObj}
          isPriceChanged={isPriceChanged}
          scheduledDowngrade={scheduledDowngrade}
        />
        <CardHeader className="px-4 pb-0 sm:px-6">
          <Header
            plan={plan}
            isLoading={isLoading}
            statusInfo={statusInfo}
            subscription={subscription}
            customDescription={customDescription}
          />
        </CardHeader>

        <CardContent className="grid grid-cols-1 gap-6 p-4 sm:p-6 md:grid-cols-2 md:gap-8">
          <Resources groupedFeatures={groupedFeatures} isLoading={isLoading} />
          <Manager subscription={subscription} isLoading={isLoading} />
        </CardContent>
      </Card>
    </>
  );
};
