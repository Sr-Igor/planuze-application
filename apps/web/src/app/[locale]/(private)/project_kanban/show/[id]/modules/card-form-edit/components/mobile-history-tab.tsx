"use client";

import { useState } from "react";

import { History, Move } from "lucide-react";

import { project_kanban_cycle_card } from "@repo/types";
import { Separator, Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui-new";

import { Logs, Movements } from "./columns";

export interface IMobileHistoryTabProps {
  item?: project_kanban_cycle_card;
}

const listClassName = "bg-secondary border-foreground/10 h-10 w-full rounded-none border p-0";
const triggerClassName =
  "text-foreground m-0 h-full flex-1 rounded-none data-[state=active]:bg-foreground/10 px-4";
const separatorClassName = "bg-foreground/10";

export const MobileHistoryTab = ({ item }: IMobileHistoryTabProps) => {
  const [mobileHistoryTab, setMobileHistoryTab] = useState("logs");

  return (
    <Tabs className="xl:hidden" value={mobileHistoryTab} onValueChange={setMobileHistoryTab}>
      <TabsList className={listClassName}>
        <TabsTrigger
          value="logs"
          className={triggerClassName}
          onClick={() => setMobileHistoryTab("logs")}
        >
          <History />
        </TabsTrigger>
        <Separator orientation="vertical" className={separatorClassName} />
        <TabsTrigger
          value="movements"
          className={triggerClassName}
          onClick={() => setMobileHistoryTab("movements")}
        >
          <Move />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="logs">
        <Logs item={item} />
      </TabsContent>
      <TabsContent value="movements">
        <Movements item={item} />
      </TabsContent>
    </Tabs>
  );
};
