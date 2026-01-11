"use client";

import { ScrollArea } from "@repo/ui";

import { placeholder } from "@/api/callers/dashboard/placeholder/personal";
import { useIntlFormat } from "@/hooks/intl-format";

import { Header } from "./components/header";
import { Metadata } from "./components/metadata";
import { TabList, TabValue } from "./components/tab-list";
import { General } from "./components/tabs/general";
import { Projects } from "./components/tabs/projects";
import { IIndexProps } from "./types";

export default function ({
  filters,
  setFilters,
  handleExport,
  data = placeholder,
  isLoading,
  isExporting,
}: IIndexProps) {
  const activeTab = (filters.personal_tab as TabValue) || "general";

  const { money } = useIntlFormat();

  const currencyToUse =
    filters.convert_currency || data?.currencyMetadata?.targetCurrency || money.currency;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-background border-b p-4">
        <Header
          onExport={handleExport}
          isExporting={isExporting}
          selectedCurrency={currencyToUse}
          onCurrencyChange={(convert_currency) => setFilters({ convert_currency })}
        />

        <div className="mt-4">
          <TabList activeTab={activeTab} onTabChange={(tab) => setFilters({ personal_tab: tab })} />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="h-[calc(100%-268px)] flex-1">
        <div className="p-6">
          {activeTab === "general" && (
            <General
              profile={data?.profile}
              profileInfo={data?.profileInfo}
              financial={data?.financial}
              financialEvolution={data?.financialEvolution}
              isLoading={isLoading}
            />
          )}
          {activeTab === "projects" && (
            <Projects
              summary={data?.summary}
              projects={data?.projects || []}
              isLoading={isLoading}
            />
          )}

          {/* Metadata */}
          {!isLoading && data?.metadata && (
            <Metadata metadata={data.metadata} currencyMetadata={data.currencyMetadata} />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
