/**
 * TableEmptyState Component
 *
 * @module presentation/composites/app-table/components
 */

"use client";

import { Inbox } from "lucide-react";
import { memo } from "react";

import { Button } from "../../../primitives/button";
import { TableEmptyStateProps } from "../types";

function TableEmptyStateComponent({ message, icon, action, labels }: Readonly<TableEmptyStateProps>) {
  const noDataLabel = labels?.noDataFound ?? "No data found";

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="text-muted-foreground mb-4">{icon || <Inbox size={48} />}</div>

      <h3 className="text-foreground text-md mb-2 text-center font-semibold md:text-lg">
        {noDataLabel}
      </h3>

      <p className="text-muted-foreground mb-6 max-w-md text-center text-sm">{message}</p>

      {action && (
        <Button onClick={action.onClick} variant="outline" size="sm">
          {action.label}
        </Button>
      )}
    </div>
  );
}

export const AppTableEmptyState = memo(TableEmptyStateComponent);
