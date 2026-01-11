import { useEffect, useState } from "react";

import { CopyIcon, Filter } from "lucide-react";
import { toast } from "sonner";

import { useLang } from "@repo/language/hook";
import {
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Separator,
  Tabs,
  TabsContent,
} from "@repo/ui";
import { AppTooltip } from "@repo/ui/app";

import { useDebounce } from "@/hooks/debounce";
import { cn } from "@/lib/utils";

import { useKanbanShow } from "../../context";
import { TabList } from "../../modules/report/components/tab-list";
import {
  Actions,
  CardType,
  CreatedAt,
  Cycle,
  EndDateEstimate,
  EndDateExecute,
  Eraser,
  FilterTabs,
  Objective,
  Profile,
  Search,
  Version,
  WorkType,
} from "./components";
import { Input } from "./components/input";
import { MinMax } from "./components/minMax";
import { MobileFilters } from "./components/mobile-filters";
import { useData } from "./hooks";
import { FilterKey } from "./types";

export interface ILineProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Line = ({ open, setOpen }: ILineProps) => {
  const t = useLang();

  const { data, params, setParams, loadings } = useKanbanShow();
  const { cycles, profileOptions, countFilters, values, dateValues, objectKeys } = useData();
  const isList = params?.view === "list" || params?.view === "reports";
  const isReport = params?.view === "reports";

  const searchPage = values.search;

  const [tab, setTab] = useState<string>("selects");

  //------------------------------- SEARCH VALUE ------------------------------------------//
  const [introSearch, setIntroSearch] = useState<string | undefined>(undefined);
  const debouncedValue = useDebounce(introSearch, 500);

  //------------------------------- EFFECTS ------------------------------------------//
  useEffect(() => {
    if (objectKeys.search) {
      setParams({ ...params, [objectKeys.search]: debouncedValue });
    }
  }, [debouncedValue]);

  useEffect(() => {
    setIntroSearch(searchPage);
  }, [params?.view]);

  //------------------------------- HANDLERS ------------------------------------------//
  const handleFilters = (key: FilterKey, value: string) => {
    const parsedKey = objectKeys[key];
    if (parsedKey) {
      setParams({ ...params, [parsedKey]: value });
    }
  };

  const handleClear = () => {
    const clearedParams = Object.values(objectKeys).reduce(
      (acc, key) => {
        if (key === "cycle" || key === "search" || key === "list_search") return acc;
        acc[key as keyof typeof params] = undefined;
        return acc;
      },
      {} as Partial<typeof params>
    );

    setParams({
      ...params,
      ...clearedParams,
    });
  };

  const FiltersActions = () => {
    return (
      <div className="mb-0.5 flex items-center gap-2">
        <Eraser onClear={handleClear} disabled={!countFilters.total} />
        <AppTooltip text={t.helper("copy_url_with_filters")}>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.info(t.helper("copied"));
            }}
          >
            <CopyIcon />
          </Button>
        </AppTooltip>
      </div>
    );
  };

  //------------------------------- RENDER ------------------------------------------//
  return (
    <Tabs defaultValue="selects" value={isReport ? "selects" : undefined}>
      <Collapsible open={open} onOpenChange={setOpen}>
        <div
          className={cn(
            "flex flex-col gap-4 px-4 pt-4 xl:flex-row xl:items-center xl:justify-between xl:px-6"
          )}
        >
          {/* Mobile/Tablet Layout */}
          <div className="flex justify-between gap-3 xl:hidden">
            <div className="flex items-center gap-2">
              <Cycle
                isList={isList}
                value={values.cycle}
                setValue={(value) => handleFilters("cycle", value)}
                cycles={cycles}
                loading={loadings.kanban.show}
              />
              {!isReport && (
                <Search
                  value={introSearch}
                  setValue={(value) => setIntroSearch(value)}
                  disabled={loadings.cycle.index}
                />
              )}
            </div>
            <div className="hidden items-center justify-between gap-2 sm:flex">
              {isReport && (
                <span className="block xl:hidden">
                  <TabList />
                </span>
              )}
              <span className="hidden sm:flex">
                <MobileFilters
                  values={values}
                  dateValues={dateValues}
                  objectKeys={objectKeys}
                  profileOptions={profileOptions}
                  countFilters={countFilters}
                  handleFilters={handleFilters}
                  handleClear={handleClear}
                  loadings={loadings}
                  data={data}
                  params={params}
                  setParams={setParams}
                  isReport={isReport}
                />
                {!isReport && <Actions />}
              </span>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden xl:flex xl:w-full xl:items-center xl:justify-between">
            <div className="flex h-8 items-center justify-start gap-2">
              <Cycle
                isList={isList}
                value={values.cycle}
                setValue={(value) => handleFilters("cycle", value)}
                cycles={cycles}
                loading={loadings.kanban.show}
              />

              {!isReport && (
                <Search
                  value={introSearch}
                  setValue={(value) => setIntroSearch(value)}
                  disabled={loadings.cycle.index}
                />
              )}

              <Separator orientation="vertical" className="mx-2" />

              <CollapsibleTrigger asChild>
                <span className="relative cursor-pointer">
                  {!open && countFilters.total > 0 && (
                    <p
                      className="absolute z-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-[10px] font-bold"
                      style={{ top: "-5px", right: "-1.5px" }}
                    >
                      {countFilters.total > 9 ? "9+" : countFilters.total}
                    </p>
                  )}
                  <Button variant="secondary" disabled={loadings.cycle.show || !data.cycles.length}>
                    <Filter className={cn(open && "text-blue-500")} />
                  </Button>
                </span>
              </CollapsibleTrigger>

              {open && (
                <FilterTabs
                  countFilters={countFilters}
                  tab={tab}
                  setTab={setTab}
                  isReport={isReport}
                />
              )}
            </div>

            {!isReport && <Actions />}
          </div>
          <span className="hidden xl:block">{isReport && <TabList />}</span>
        </div>

        <CollapsibleContent className="mt-4 hidden border-t px-2 pt-2 pb-4 transition-all duration-300 ease-in-out xl:block">
          <TabsContent value="selects">
            <div className="flex flex-wrap items-end gap-2 rounded-md border-b p-4">
              {objectKeys.cardType && (
                <CardType
                  value={values.cardType}
                  setValue={(value) => handleFilters("cardType", value)}
                />
              )}

              {objectKeys.member && (
                <Profile
                  value={values.member?.split(",")?.filter(Boolean) || []}
                  setValue={(value) => handleFilters("member", value ? value.join(",") : undefined)}
                  options={profileOptions}
                  loading={
                    loadings.member.index || loadings.allocation.index || loadings.cycle.index
                  }
                  profiles={data.profiles}
                />
              )}

              {objectKeys.workType && (
                <WorkType
                  value={values.workType}
                  setValue={(value) => handleFilters("workType", value)}
                />
              )}

              {objectKeys.objective && (
                <Objective
                  value={values.objective}
                  setValue={(value) => handleFilters("objective", value)}
                />
              )}

              {objectKeys.version && (
                <Version
                  value={values.version}
                  setValue={(value) => handleFilters("version", value)}
                />
              )}

              <FiltersActions />
            </div>
          </TabsContent>

          {!isReport && (
            <>
              <TabsContent value="dates">
                <div className="flex flex-wrap items-end gap-2 rounded-md border-b p-4">
                  <EndDateEstimate
                    values={dateValues}
                    handleDateFilters={(data) => setParams({ ...params, ...data })}
                    loading={loadings.cycle.show}
                    objectKeys={objectKeys}
                  />

                  <EndDateExecute
                    values={dateValues}
                    handleDateFilters={(data) => setParams({ ...params, ...data })}
                    loading={loadings.cycle.show}
                    objectKeys={objectKeys}
                  />

                  <CreatedAt
                    values={dateValues}
                    handleDateFilters={(data) => setParams({ ...params, ...data })}
                    loading={loadings.cycle.show}
                    objectKeys={objectKeys}
                  />

                  <FiltersActions />
                </div>
              </TabsContent>

              <TabsContent value="interval">
                <div className="flex flex-wrap items-end gap-2 rounded-md border-b p-4">
                  <MinMax values={values} keyItem={"severity"} handleFilters={handleFilters} />
                  <Separator orientation="vertical" className="mx-2 hidden h-10 lg:block" />
                  <MinMax values={values} keyItem={"priority"} handleFilters={handleFilters} />
                  <Separator orientation="vertical" className="mx-2 hidden h-10 lg:block" />
                  <MinMax values={values} keyItem={"estimate"} handleFilters={handleFilters} />
                  <Separator orientation="vertical" className="mx-2 hidden h-10 lg:block" />
                  <MinMax values={values} keyItem={"execute"} handleFilters={handleFilters} />
                  <Separator orientation="vertical" className="mx-2 hidden h-10 lg:block" />
                  <MinMax
                    values={values}
                    keyItem={"work_in_progress"}
                    handleFilters={handleFilters}
                  />
                  <Separator orientation="vertical" className="mx-2 hidden h-10 lg:block" />
                  <FiltersActions />
                </div>
              </TabsContent>

              <TabsContent value="open">
                <div className="flex flex-wrap items-end gap-2 rounded-md border-b p-4">
                  <Input
                    value={values.public_id}
                    setValue={(value) => handleFilters("public_id", value)}
                    disabled={false}
                    keyItem={"public_id"}
                  />
                  <Input
                    value={values.tag}
                    setValue={(value) => handleFilters("tag", value)}
                    disabled={false}
                    keyItem={"tag"}
                  />
                  <Input
                    value={values.description}
                    setValue={(value) => handleFilters("description", value)}
                    disabled={false}
                    keyItem={"description"}
                  />

                  <FiltersActions />
                </div>
              </TabsContent>
            </>
          )}
        </CollapsibleContent>
      </Collapsible>
    </Tabs>
  );
};
