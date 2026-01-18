/**
 * TableActions Component
 *
 * @module presentation/composites/app-table/components
 */

"use client";

import { Loader2, MoreHorizontal } from "lucide-react";
import { Fragment, memo, ReactNode, useCallback, useState } from "react";

import { cn } from "../../../../shared/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../primitives/alert-dialog";
import { Button } from "../../../primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../primitives/dropdown-menu";
import { BaseTableItem, TableActionsProps } from "../types";

function TableActionsComponent<T extends BaseTableItem>({
  item,
  actions,
  isLoading,
  labels,
}: TableActionsProps<T>) {
  const [openAlert, setOpenAlert] = useState<string | null>(null);
  const [executingAction, setExecutingAction] = useState<string | null>(null);

  const openMenuLabel = labels?.openMenu ?? "Open menu";
  const confirmActionLabel = labels?.confirmAction ?? "Confirm action";
  const cancelLabel = labels?.cancel ?? "Cancel";
  const confirmLabel = labels?.confirm ?? "Confirm";

  const visibleActions = actions.filter((action) => {
    if (action.isVisible) {
      return action.isVisible(item);
    }
    return true;
  });

  const handleActionClick = useCallback(
    async (
      actionLabel: string,
      preOnClick: (() => Promise<void> | void) | undefined,
      actionFn: () => Promise<void> | void,
      confirmText?: string
    ) => {
      if (confirmText) {
        preOnClick?.();
        setOpenAlert(actionLabel);
        return;
      }

      setExecutingAction(actionLabel);
      try {
        await actionFn();
      } catch (error) {
        console.error("Error while executing action:", error);
      } finally {
        setExecutingAction(null);
      }
    },
    []
  );

  const handleConfirmAction = useCallback(
    async (actionLabel: string, actionFn: () => Promise<void> | void) => {
      setOpenAlert(null);
      setExecutingAction(actionLabel);
      try {
        await actionFn();
      } catch (error) {
        console.error("Error while executing action:", error);
      } finally {
        setExecutingAction(null);
      }
    },
    []
  );

  if (visibleActions.length === 0) {
    return (
      <div className="flex h-8 w-8 items-center justify-center">
        <span className="text-muted-foreground text-xs">-</span>
      </div>
    );
  }

  const isActionDisabled = (actionLabel: string) => {
    return isLoading || executingAction === actionLabel;
  };

  const getActionIcon = (actionLabel: string, icon?: ReactNode) => {
    if (executingAction === actionLabel) {
      return <Loader2 size={14} className="animate-spin" />;
    }
    return icon;
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            disabled={isLoading || executingAction !== null}
          >
            <MoreHorizontal size={14} />
            <span className="sr-only">{openMenuLabel}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuGroup>
            {visibleActions.map((action) => {
              const isDisabled = action.isDisabled?.(item) || isActionDisabled(action.label);

              return (
                <Fragment key={action.label}>
                  {action.separatorTop && <DropdownMenuSeparator />}

                  <DropdownMenuItem
                    className={cn("cursor-pointer gap-2")}
                    variant={action.variant}
                    disabled={isDisabled}
                    onClick={() =>
                      handleActionClick(
                        action.label,
                        action.preOnClick ? () => action.preOnClick?.(item) : undefined,
                        () => action.onClick(item),
                        action.confirmText
                      )
                    }
                  >
                    {getActionIcon(action.label, action.icon)}
                    <span className="flex-1">{action.label}</span>
                  </DropdownMenuItem>

                  {action.separatorBottom && <DropdownMenuSeparator />}
                </Fragment>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {openAlert && (
        <AlertDialog open={true} onOpenChange={() => setOpenAlert(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{confirmActionLabel}</AlertDialogTitle>
              <AlertDialogDescription>
                {actions.find((a) => a.label === openAlert)?.confirmText}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setOpenAlert(null)}>
                {cancelLabel}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  const action = actions.find((a) => a.label === openAlert);
                  if (action) {
                    handleConfirmAction(action.label, () => action.onClick(item));
                  }
                }}
                className={cn(
                  actions.find((a) => a.label === openAlert)?.variant === "destructive" &&
                    "bg-destructive hover:bg-destructive/90 text-white"
                )}
              >
                {confirmLabel}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
}

export const AppTableActions = memo(TableActionsComponent) as typeof TableActionsComponent;
