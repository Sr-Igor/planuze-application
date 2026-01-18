import { memo } from "react";

import * as icons from "lucide-react";

import { Checkbox , Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui";
import { AppTooltip } from "@repo/ui/app";

import { cn } from "@repo/ui";

import { PermissionTableProps } from "../types";
import { getCheckboxState } from "../utils/checkbox-state";

export const PermissionTable = memo(
  ({
    groupFeatures,
    allActions,
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
    isGroupAllSelected,
    isGroupSomeSelected,
    handleGroupSelectAll,
  }: PermissionTableProps) => {
    return (
      <div className="w-full overflow-x-auto">
        <Table className="table-fixed border border-none">
          <TableHeader className="border-none">
            <TableRow className="border-none">
              <TableHead className="border-muted-foreground w-12 border border-l-0 px-0 text-center font-bold">
                <div className="flex h-full items-center justify-center py-2">
                  <Checkbox
                    className="border-muted-foreground rounded-sm border"
                    checked={getCheckboxState(
                      isGroupAllSelected(groupFeatures),
                      isGroupSomeSelected(groupFeatures)
                    )}
                    onCheckedChange={() => handleGroupSelectAll(groupFeatures)}
                    disabled={loading || isDisabled(status, allowed, isAdministrator)}
                  />
                </div>
              </TableHead>
              <TableHead className="border-muted-foreground border text-center font-bold">
                <div className="text-xs">{t.permission("feature")}</div>
              </TableHead>
              {allActions.map((action) => (
                <TableHead
                  key={action}
                  className="border-muted-foreground w-20 border text-center font-bold last:border-r-0"
                >
                  <div className="text-xs">{t.permission(action)}</div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {groupFeatures.map((feature) => (
              <TableRow key={feature.path}>
                <TableCell className="border-muted-foreground w-12 border border-b-0 border-l-0 px-0">
                  <div className="flex h-full items-center justify-center py-2">
                    <Checkbox
                      className="border-muted-foreground rounded-sm border"
                      checked={getCheckboxState(
                        isFeatureAllSelected(feature),
                        isFeatureSomeSelected(feature)
                      )}
                      onCheckedChange={() => handleFeatureSelectAll(feature)}
                      disabled={loading || isDisabled(status, allowed, isAdministrator)}
                    />
                  </div>
                </TableCell>
                <TableCell className="border-muted-foreground border border-b-0">
                  <div className="text-xs">{t.model(feature.path!)}</div>
                </TableCell>
                {allActions.map((action) => {
                  const isActionAvailable = feature.actions.includes(action);
                  const isChecked = isActionSelected(feature.path!, action);

                  const { isDep, listNames } = isPerDependency(feature.id!, action);
                  const list = `${listNames.map((i) => `${t.model(i.feature)} - ${t.permission(i.action)}`).join("\n")}`;

                  return (
                    <TableCell
                      key={action}
                      className="border-muted-foreground overflow-hidden border border-b-0 p-0 last:border-r-0"
                    >
                      <span
                        className={cn(
                          "flex h-12 w-20 items-center justify-center gap-2",
                          !isActionAvailable && "bg-muted"
                        )}
                      >
                        {isActionAvailable && (
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
                              <AppTooltip text={t.permission("dependency", { list })}>
                                <icons.Info className="h-4 w-4 text-blue-500" />
                              </AppTooltip>
                            )}
                          </>
                        )}
                        {!isActionAvailable && (
                          <AppTooltip
                            text={t.permission("not_available", {
                              action: t.permission(action),
                            })}
                          >
                            <icons.Ban className="text-muted-foreground" size={18} />
                          </AppTooltip>
                        )}
                      </span>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
);

PermissionTable.displayName = "PermissionTable";
