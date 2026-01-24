"use client";

import { personalDashboardPlaceholder } from "@repo/api/placeholders";
import { useIntlFormat } from "@repo/language/hooks";
import { ScrollArea } from "@repo/ui";

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
  data = personalDashboardPlaceholder,
  isLoading,
  isExporting,
}: IIndexProps) {
  const inLoading = isLoading || data?.module?.title !== "personal";
  const usualData = inLoading ? personalDashboardPlaceholder : data;

  const activeTab = (filters.personal_tab as TabValue) || "general";

  const { money } = useIntlFormat();

  const currencyToUse =
    filters.convert_currency || usualData?.currencyMetadata?.targetCurrency || money.currency;

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
              profile={usualData?.profile}
              profileInfo={usualData?.profileInfo}
              financial={usualData?.financial}
              financialEvolution={usualData?.financialEvolution}
              isLoading={inLoading}
            />
          )}
          {activeTab === "projects" && (
            <Projects
              summary={usualData?.summary}
              projects={usualData?.projects || []}
              isLoading={inLoading}
            />
          )}

          {/* Metadata */}
          {!inLoading && usualData?.metadata && (
            <Metadata metadata={usualData.metadata} currencyMetadata={usualData.currencyMetadata} />
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
