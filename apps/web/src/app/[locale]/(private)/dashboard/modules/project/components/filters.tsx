"use client";

import * as React from "react";

import { CheckIcon, TrashIcon } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui";
import { AppDialog } from "@repo/ui/app";

import { useFilters } from "../hooks/use-filters";
import { QueryFilters } from "../types";

export interface IFiltersProps {
  filters: QueryFilters;
  onFiltersChange: (filters: QueryFilters) => void;
  resetFilters: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const Filters = ({
  filters,
  onFiltersChange,
  resetFilters,
  open,
  onOpenChange,
}: IFiltersProps) => {
  const t = useLang();
  const form = useFilters({ filters });

  const handleApplyFilters = () => {
    onFiltersChange(form.hook.getValues());
    onOpenChange(false);
  };

  const handleClearFilters = () => {
    resetFilters();
    form.clearFilters();
    onOpenChange(false);
  };

  return (
    <AppDialog
      open={open}
      onOpenChange={() => {
        onOpenChange(false);
        form.hook.reset();
      }}
      title={t.page.dashboard("project.filters.title")}
      description={t.page.dashboard("project.filters.description")}
      footer={
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="destructive"
            onClick={handleClearFilters}
            disabled={!form.hasActiveFilters}
          >
            <TrashIcon className="h-4 w-4" />
            <span className="hidden xl:inline">{t.page.dashboard("project.filters.clear")}</span>
          </Button>
          <Button variant="default" onClick={handleApplyFilters} disabled={!form.isDirty}>
            <CheckIcon className="h-4 w-4" />
            <span className="hidden xl:inline">{t.page.dashboard("project.filters.apply")}</span>
          </Button>
        </div>
      }
    >
      <form.Form {...form.formProps} className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2" />
    </AppDialog>
  );
};
