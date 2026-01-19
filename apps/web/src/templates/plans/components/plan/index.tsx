import React from "react";

import { Card, CardContent, CardFooter, CardHeader } from "@repo/ui";

import { useUtilsPlan } from "../../hooks/use-utils-plan";
import { IPlanCardProps } from "../../types";
import { Content } from "./content";
import { Footer } from "./footer";
import { Header } from "./header";

export const PlanCard = (props: IPlanCardProps) => {
  const { getFeaturesByModule, getPopularBadge } = useUtilsPlan();

  const isFree = !props.plan.price;
  const isPopular = props.plan.is_popular;
  const isCurrentUserPlan = props.isCurrentPlan(props.plan);
  const featuresByModule = getFeaturesByModule(props.plan);

  if (isFree && !!props.subscription && !isCurrentUserPlan) return null;

  return (
    <div key={props.plan.id} className="relative">
      {getPopularBadge(props.plan, isCurrentUserPlan)}
      <Card
        className={`relative h-full min-h-[600px] gap-0 overflow-hidden border-2 py-0 transition-all duration-300 hover:shadow-lg sm:min-h-[650px] ${
          isCurrentUserPlan
            ? isPopular
              ? "border-2 border-purple-200 opacity-80 shadow-lg dark:border-purple-800"
              : "border-2 border-blue-200 opacity-80 shadow-md dark:border-blue-800"
            : isFree
              ? "border-2 border-green-200 shadow-md dark:border-green-800"
              : isPopular
                ? "border-2 border-purple-200 shadow-lg dark:border-purple-800"
                : "hover:border-gray-300 dark:hover:border-gray-600"
        }`}
      >
        <CardHeader className="bg-sidebar-accent/60 p-4 text-center sm:p-6">
          <Header
            plan={props.plan}
            isFree={isFree}
            isLoading={props.isLoading}
            isPopular={isPopular}
            isCurrentUserPlan={isCurrentUserPlan}
          />
        </CardHeader>

        <CardContent className="h-full space-y-3 p-4 sm:p-6">
          <Content
            isLoading={props.isLoading}
            plan={props.plan}
            featuresByModule={featuresByModule}
          />
        </CardContent>

        <CardFooter className="p-4 sm:p-6">
          <Footer
            {...props}
            isFree={isFree}
            isPopular={isPopular}
            isCurrentUserPlan={isCurrentUserPlan}
          />
        </CardFooter>
      </Card>
    </div>
  );
};
