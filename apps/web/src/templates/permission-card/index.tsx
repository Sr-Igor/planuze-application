import { useCallback, useState } from "react";

import { useLang } from "@repo/language/hooks";
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui";
import { Icon } from "@repo/ui/app";

import { cn } from "@repo/ui";

import { GroupCollapsible } from "./components/group-collapsible";
import { SmallScreenView } from "./components/small-screen-view";
import { usePermissionCard } from "./hooks/use-permission-card";
import { IPermissionCardProps } from "./types";
import { getCheckboxState } from "./utils/checkbox-state";

export const PermissionCard = <T extends Record<string, any>>({
  module,
  companyView,
  access,
  userView,
  actions,
  loading,
  handleDirty,
  allowed,
  isAdministrator = false,
  additionalDisabledCondition = false,
  onUpdate,
  getActionKey,
  getFeaturePath,
  getActionTitle,
  defaultOpen = true,
  showButtons = true,
  customDisabledCondition,
  onlyIntegrations = false,
}: IPermissionCardProps<T>) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const t = useLang();

  const memoizedGetFeaturePath = useCallback(
    (action: T) => {
      if (getFeaturePath) return getFeaturePath(action);
      return action?.feature?.path || "";
    },
    [getFeaturePath]
  );

  const memoizedGetActionTitle = useCallback(
    (action: T) => {
      if (getActionTitle) return getActionTitle(action);
      return action?.action?.title || "";
    },
    [getActionTitle]
  );

  const {
    hasPendingChanges,
    status,
    isSmallScreen,
    sortedFeatures,
    groupedFeatures,
    allActions,
    isAllSelected,
    isSomeSelected,
    isActionSelected,
    isDisabled,
    isPerDependency,
    isFeatureAllSelected,
    isFeatureSomeSelected,
    isGroupAllSelected,
    isGroupSomeSelected,
    handleSelectAll,
    handleFeatureSelectAll,
    handleGroupSelectAll,
    handleActionChange,
    handleSubmit: submitHandler,
    handleDiscard,
  } = usePermissionCard({
    module,
    companyView,
    userView,
    access,
    actions,
    getActionKey,
    getFeaturePath: memoizedGetFeaturePath,
    getActionTitle: memoizedGetActionTitle,
    handleDirty,
    allowed,
    isAdministrator,
    customDisabledCondition,
    additionalDisabledCondition,
  });

  const handleSubmit = async () => {
    await submitHandler(onUpdate);
  };

  return (
    <>
      {status === "active" && (
        <Card className={cn("flex p-0", hasPendingChanges && "border border-yellow-500")}>
          <CardContent className="w-full p-0">
            <Collapsible
              open={isOpen}
              onOpenChange={() => {
                status === "active" && setIsOpen((prev) => !prev);
              }}
              className={cn("flex w-full flex-col gap-2")}
            >
              <CollapsibleTrigger asChild>
                <div
                  className={cn(
                    "hover:bg-muted/50 flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-5",
                    status !== "active" &&
                      "cursor-not-allowed opacity-50 hover:cursor-not-allowed hover:bg-transparent"
                  )}
                >
                  <span className="flex flex-1 items-center gap-2">
                    <Icon name={module?.icon} size={18} />
                    {t.module(module?.title)}
                  </span>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="flex flex-col gap-2 px-1 pb-3 sm:px-3">
                {isSmallScreen ? (
                  <SmallScreenView
                    sortedFeatures={sortedFeatures}
                    allActions={allActions}
                    isAllSelected={isAllSelected}
                    isSomeSelected={isSomeSelected}
                    handleSelectAll={handleSelectAll}
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
                  />
                ) : (
                  <div className="flex flex-col gap-4">
                    <div className="border-muted-foreground flex items-center gap-2 rounded-lg border p-3">
                      <Checkbox
                        className="border-foreground rounded-sm border"
                        checked={getCheckboxState(isAllSelected, isSomeSelected)}
                        onCheckedChange={handleSelectAll}
                        disabled={loading || isDisabled(status, allowed, isAdministrator)}
                      />
                      <span className="text-xs font-semibold">
                        {t.page.level("show.select_all")}
                      </span>
                    </div>

                    {Object.entries(groupedFeatures).map(([groupName, groupFeatures]) => (
                      <GroupCollapsible
                        key={groupName}
                        groupName={groupName}
                        groupFeatures={groupFeatures}
                        allActions={allActions}
                        isGroupAllSelected={isGroupAllSelected}
                        isGroupSomeSelected={isGroupSomeSelected}
                        handleGroupSelectAll={handleGroupSelectAll}
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
                      />
                    ))}
                  </div>
                )}
                {showButtons &&
                  status === "active" &&
                  !isDisabled(status, allowed, isAdministrator) && (
                    <div className="mt-4 flex flex-col gap-2 md:flex-row md:justify-end">
                      <Button
                        onClick={handleDiscard}
                        disabled={!hasPendingChanges || loading}
                        variant={"outline"}
                        className="w-full text-xs md:w-auto md:text-sm"
                      >
                        {t.helper("discard")}
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={!hasPendingChanges}
                        loading={loading}
                        className="w-full text-xs md:w-auto md:text-sm"
                      >
                        {t.helper("save")}
                      </Button>
                    </div>
                  )}
              </CollapsibleContent>
            </Collapsible>
          </CardContent>
        </Card>
      )}
    </>
  );
};
