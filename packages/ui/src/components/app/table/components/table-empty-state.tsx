"use client";

import React, { memo } from "react";

import { Inbox } from "lucide-react";

import { useLang } from "@repo/language/hook";
import { Button } from "@repo/ui";

import { TableEmptyStateProps } from "../types/index";

function TableEmptyStateComponent({ message, icon, action }: TableEmptyStateProps) {
  const t = useLang();

  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="text-muted-foreground mb-4">{icon || <Inbox size={48} />}</div>

      <h3 className="text-foreground text-md mb-2 text-center font-semibold md:text-lg">
        {t.helper("no_data_found")}
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
