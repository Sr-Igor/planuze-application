import React from "react";

import { ShieldCheck } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Badge, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@repo/ui";

interface FeatureActionsListProps {
  actions: any[];
  planFeature: any;
}

export const FeatureActionsList: React.FC<FeatureActionsListProps> = ({ actions, planFeature }) => {
  const t = useLang();
  if (!planFeature) return null;
  return (
    <div className="mt-2 ml-6 flex flex-wrap gap-2">
      {planFeature?.plan_feature_actions?.length ? (
        planFeature.plan_feature_actions.map((pfa: any) => {
          const action = actions.find((a: any) => a.id === pfa.action_id);
          return (
            <TooltipProvider key={pfa.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className="bg-primary/10 border-primary/30 text-primary flex items-center gap-1 px-2 py-1 text-xs"
                  >
                    <ShieldCheck className="mr-1 h-3 w-3" />
                    <span className="max-w-[120px] truncate">
                      {action?.title || t.plan("actions.unknown")}
                    </span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>{action?.title || t.plan("actions.unknown")}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })
      ) : (
        <div className="rounded bg-zinc-50 px-2 py-1 text-sm text-gray-400 italic dark:bg-zinc-900">
          {t.plan("actions.none_linked")}
        </div>
      )}
    </div>
  );
};
