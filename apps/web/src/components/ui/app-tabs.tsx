import { memo } from "react";

import { LockIcon } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger , cn } from "@repo/ui";

import { SimpleSelect } from "@repo/form";

export interface IAppTabsProps {
  tabs: {
    value: string;
    title: string;
    disabled?: boolean;
    invisible?: boolean;
    loading?: boolean;
    count?: number;
    children: React.ReactNode;
  }[];
  className?: string;
  headerClassName?: string;
  defaultValue?: string;
  value: string;
  onChange?: (value: string) => void;
  hideTabs?: boolean;
}

export const AppTabs = memo(function AppTabs({
  tabs = [],
  className,
  defaultValue,
  value,
  onChange,
  headerClassName,
  hideTabs = false,
}: IAppTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className={className} value={value} onValueChange={onChange}>
      {!hideTabs && (
        <>
          {/* Mobile: Select */}
          <div className={cn("mb-4", headerClassName)}>
            <div className="block w-full md:hidden">
              <SimpleSelect
                options={tabs.map((tab) => ({
                  label: tab.title,
                  value: tab.value,
                  disabled: tab.disabled || tab.loading,
                }))}
                value={value}
                onChange={onChange}
                triggerClassName="w-full"
                className="text-xs"
              />
            </div>
            {/* Desktop: Tabs */}
            <TabsList className="bg-secondary hidden w-full justify-between overflow-x-auto p-1 md:flex">
              {tabs.map((tab) => {
                if (tab.invisible) return null;

                return (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    disabled={tab.disabled || tab.loading}
                    className="min-w-0 flex-1 text-xs whitespace-nowrap md:text-sm"
                  >
                    <span className="truncate">{tab.title}</span>
                    {tab.disabled && (
                      <LockIcon className="ml-1 h-3 w-3 flex-shrink-0 md:ml-2 md:h-4 md:w-4" />
                    )}
                    {tab.count && (
                      <div className="text-bold flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                        {tab.count}
                      </div>
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
        </>
      )}

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.children}
        </TabsContent>
      ))}
    </Tabs>
  );
});
