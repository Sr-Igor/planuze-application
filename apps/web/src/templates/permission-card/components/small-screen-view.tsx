import { memo } from "react";

import * as icons from "lucide-react";

import { Checkbox } from "@repo/ui-new";
import { AppTooltip } from "@repo/ui-new";

import { SmallScreenViewProps } from "../types";
import { getCheckboxState } from "../utils/checkbox-state";

export const SmallScreenView = memo(
  ({
    sortedFeatures,
    allActions,
    isAllSelected,
    isSomeSelected,
    handleSelectAll,
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
  }: SmallScreenViewProps) => {
    return (
      <div className="flex flex-col gap-3">
        <label className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2">
          <span className="flex items-center justify-center">
            <Checkbox
              className="border-muted-foreground rounded-sm border"
              checked={getCheckboxState(isAllSelected, isSomeSelected)}
              onCheckedChange={handleSelectAll}
              disabled={loading || isDisabled(status, allowed, isAdministrator)}
            />
          </span>
          <span className="text-xs font-bold">{t.page.level("show.select_all")}</span>
        </label>
        {sortedFeatures.map((feature) => (
          <div key={feature.path} className="bg-muted flex flex-col gap-2 rounded-lg border p-3">
            <div className="bg-muted mb-1 flex items-center gap-2 rounded py-1">
              <span className="flex items-center justify-center">
                <Checkbox
                  className="border-muted-foreground rounded-sm border"
                  checked={getCheckboxState(
                    isFeatureAllSelected(feature),
                    isFeatureSomeSelected(feature)
                  )}
                  onCheckedChange={() => handleFeatureSelectAll(feature)}
                  disabled={loading || isDisabled(status, allowed, isAdministrator)}
                />
              </span>
              <span className="font-bold">{t.model(feature.path!)}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {allActions.map((action) => {
                const isActionAvailable = feature.actions.includes(action);
                const isChecked = isActionSelected(feature.path!, action);

                const { isDep, listNames } = isPerDependency(feature.id!, action);
                const list = `${listNames.map((i) => `${t.model(i.feature)} - ${t.permission(i.action)}`).join("\n")}`;

                return (
                  <label key={action} className="flex items-center gap-1">
                    {isActionAvailable ? (
                      <>
                        <Checkbox
                          className="border-muted-foreground rounded-sm border"
                          checked={isChecked}
                          onCheckedChange={() => handleActionChange(feature.path!, action)}
                          disabled={
                            loading || isDisabled(status, allowed, isAdministrator) || isDep
                          }
                        />
                        {isDep && (
                          <AppTooltip
                            text={t.permission("dependency", {
                              list,
                            })}
                          >
                            <icons.Info className="h-4 w-4 text-blue-500" />
                          </AppTooltip>
                        )}
                      </>
                    ) : (
                      <AppTooltip
                        text={t.permission("not_available", {
                          action: t.permission(action),
                        })}
                      >
                        <icons.Ban className="text-muted-foreground" size={18} />
                      </AppTooltip>
                    )}
                    <span className="text-xs">{t.permission(action)}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }
);

SmallScreenView.displayName = "SmallScreenView";
