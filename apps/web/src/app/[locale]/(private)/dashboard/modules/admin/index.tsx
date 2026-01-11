"use client";

import { ScrollArea } from "@repo/ui";

import { placeholder } from "@/api/callers/dashboard/placeholder/admin";

import { Header } from "./components/header";
import { Metadata } from "./components/metadata";
import { Overview } from "./components/tabs/overview";
import { IIndexProps } from "./types";

export default function ({
  filters,
  setFilters,
  handleExport,
  data = placeholder,
  isLoading,
  isExporting,
}: IIndexProps) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-background border-b p-4">
        <Header onExport={handleExport} isExporting={isExporting} />
      </div>

      {/* Content */}
      <ScrollArea className="h-[calc(100%-120px)] flex-1">
        <div className="p-6">
          <Overview summary={data?.summary} isLoading={isLoading} />

          {/* Metadata */}
          {!isLoading && data?.metadata && <Metadata metadata={data.metadata} />}
        </div>
      </ScrollArea>
    </div>
  );
}
