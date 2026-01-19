import { memo } from "react";

import * as icons from "lucide-react";

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@repo/ui";
import { Icon } from "@repo/ui";

import { GroupCollapsibleProps } from "../types";
import { PermissionTable } from "./permission-table";

export const GroupCollapsible = memo(
  ({
    groupName,
    groupFeatures,
    allActions,
    isGroupAllSelected,
    isGroupSomeSelected,
    handleGroupSelectAll,
    isActionSelected,
    handleActionChange,
    handleFeatureSelectAll,
    isFeatureAllSelected,
    isFeatureSomeSelected,
    isPerDependency,
    isDisabled,
    loading,
    status,
    allowed,
    isAdministrator,
    t,
  }: GroupCollapsibleProps) => {
    const iconName = groupFeatures[0]?.icon || "folder";
    return (
      <Collapsible
        key={groupName}
        defaultOpen={true}
        className="border-muted-foreground overflow-hidden rounded-lg border"
      >
        <CollapsibleTrigger asChild>
          <div className="hover:bg-muted flex cursor-pointer items-center justify-between rounded-t-lg p-3">
            <div className="flex items-center gap-2">
              <Icon name={iconName} size={18} />
              <span className="text-xs font-bold capitalize">
                {groupName === "default" ? t.page.level("show.others") : t.model(groupName)}
              </span>
            </div>
            <icons.ChevronDown className="h-4 w-4" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <PermissionTable
            groupFeatures={groupFeatures}
            allActions={allActions}
            isActionSelected={isActionSelected}
            handleActionChange={handleActionChange}
            handleFeatureSelectAll={handleFeatureSelectAll}
            isFeatureAllSelected={isFeatureAllSelected}
            isFeatureSomeSelected={isFeatureSomeSelected}
            isPerDependency={isPerDependency}
            isDisabled={isDisabled}
            loading={loading}
            status={status}
            allowed={allowed}
            isAdministrator={isAdministrator}
            t={t}
            isGroupAllSelected={isGroupAllSelected}
            isGroupSomeSelected={isGroupSomeSelected}
            handleGroupSelectAll={handleGroupSelectAll}
          />
        </CollapsibleContent>
      </Collapsible>
    );
  }
);

GroupCollapsible.displayName = "GroupCollapsible";
