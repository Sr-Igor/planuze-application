"use client";

import { useState } from "react";

import { BookOpen, Calendar, ListChecks } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { project_kanban_cycle_card } from "@repo/types";
import { Separator, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui-new";

import { DependenciesAndObjectives, Description, PlanningAndEffort } from "./columns";

export interface IMobileDetailsTabProps {
  hook: UseFormReturn<any>;
  item?: project_kanban_cycle_card;
  objectiveId?: string | null;
}

const listClassName = "bg-secondary border-foreground/10 h-10 w-full rounded-none border p-0";
const triggerClassName =
  "text-foreground m-0 h-full flex-1 rounded-none data-[state=active]:bg-foreground/10 px-4";
const separatorClassName = "bg-foreground/10";

export const MobileDetailsTab = ({ hook, item, objectiveId }: IMobileDetailsTabProps) => {
  const [mobileDetailsTab, setMobileDetailsTab] = useState("description");

  return (
    <Tabs className="xl:hidden" value={mobileDetailsTab} onValueChange={setMobileDetailsTab}>
      <TabsList className={listClassName}>
        <TabsTrigger
          value="description"
          className={triggerClassName}
          onClick={() => setMobileDetailsTab("description")}
        >
          <BookOpen />
        </TabsTrigger>
        <Separator orientation="vertical" className={separatorClassName} />
        <TabsTrigger
          value="planning"
          className={triggerClassName}
          onClick={() => setMobileDetailsTab("planning")}
        >
          <Calendar />
        </TabsTrigger>
        <Separator orientation="vertical" className={separatorClassName} />
        <TabsTrigger
          value="dependencies"
          className={triggerClassName}
          onClick={() => setMobileDetailsTab("dependencies")}
        >
          <ListChecks />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="description">
        <Description hook={hook} item={item} />
      </TabsContent>
      <TabsContent value="planning">
        <PlanningAndEffort hook={hook} />
      </TabsContent>
      <TabsContent value="dependencies">
        <DependenciesAndObjectives hook={hook} item={item} objectiveId={objectiveId} />
      </TabsContent>
    </Tabs>
  );
};
