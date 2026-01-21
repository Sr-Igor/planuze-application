import { useState } from "react";

import { CopyIcon, Filter } from "lucide-react";
import { toast } from "sonner";

import { SimpleSelect } from "@repo/form";
import { useLang } from "@repo/language/hooks";
import {
  AppTooltip,
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui";

import {
  CardType,
  CreatedAt,
  EndDateEstimate,
  EndDateExecute,
  Eraser,
  Objective,
  Profile,
  Version,
  WorkType,
} from ".";
import { FilterKey } from "../types";
import { Input } from "./input";
import { MinMax } from "./minMax";

interface MobileFiltersProps {
  values: any;
  dateValues: any;
  objectKeys: any;
  profileOptions: any;
  countFilters: any;
  handleFilters: (key: FilterKey, value: string) => void;
  handleClear: () => void;
  loadings: any;
  data: any;
  params: any;
  setParams: (params: any) => void;
  isReport?: boolean;
}

export const MobileFilters = ({
  values,
  dateValues,
  objectKeys,
  profileOptions,
  countFilters,
  handleFilters,
  handleClear,
  loadings,
  data,
  params,
  setParams,
  isReport = false,
}: MobileFiltersProps) => {
  const t = useLang();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<string>("selects");

  const kanbanT = t.page.kanban;

  const FiltersActions = () => {
    return (
      <div className="mb-4 flex items-center justify-between gap-2">
        <Eraser onClear={handleClear} disabled={!countFilters.total} />
        <AppTooltip text={t.helper("copy_url_with_filters")}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              toast.info(t.helper("copied"));
            }}
          >
            <CopyIcon className="h-4 w-4" />
          </Button>
        </AppTooltip>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm" className="xl:hidden">
          <Filter className="h-4 w-4" />

          {countFilters.total > 0 && (
            <span className="ml-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {countFilters.total > 9 ? "9+" : countFilters.total}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-[600px]! overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{kanbanT("component.line.filters")}</DialogTitle>
        </DialogHeader>

        <Tabs value={isReport ? "selects" : tab} onValueChange={setTab} className="w-full">
          {!isReport && (
            <TabsList className="mb-4 hidden w-full grid-cols-4 md:grid">
              <TabsTrigger value="selects">{kanbanT("component.line.selects")}</TabsTrigger>
              <TabsTrigger value="dates">{kanbanT("component.line.dates")}</TabsTrigger>
              <TabsTrigger value="interval">{kanbanT("component.line.interval")}</TabsTrigger>
              <TabsTrigger value="open">{kanbanT("component.line.open")}</TabsTrigger>
            </TabsList>
          )}

          {!isReport && (
            <SimpleSelect
              triggerClassName="w-full md:hidden mb-4"
              options={[
                { label: kanbanT("component.line.selects"), value: "selects" },
                { label: kanbanT("component.line.dates"), value: "dates" },
                { label: kanbanT("component.line.interval"), value: "interval" },
                { label: kanbanT("component.line.open"), value: "open" },
              ]}
              value={tab}
              onChange={(value) => setTab(value as string)}
              className="w-full"
            />
          )}

          <div className="flex justify-end">
            <FiltersActions />
          </div>

          <TabsContent value="selects" className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
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
            </div>
          </TabsContent>

          {!isReport && (
            <>
              <TabsContent value="dates" className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
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
                </div>
              </TabsContent>

              <TabsContent value="interval" className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <MinMax values={values} keyItem={"severity"} handleFilters={handleFilters} />
                  <MinMax values={values} keyItem={"priority"} handleFilters={handleFilters} />
                  <MinMax values={values} keyItem={"estimate"} handleFilters={handleFilters} />
                  <MinMax values={values} keyItem={"execute"} handleFilters={handleFilters} />
                  <MinMax
                    values={values}
                    keyItem={"work_in_progress"}
                    handleFilters={handleFilters}
                  />
                </div>
              </TabsContent>

              <TabsContent value="open" className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
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
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>

        <DialogFooter className="flex justify-end gap-2 pt-4">
          <Button
            variant="secondary"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            {t.helper("close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
