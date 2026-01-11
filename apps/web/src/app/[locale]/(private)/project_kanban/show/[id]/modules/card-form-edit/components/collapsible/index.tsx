import { useState } from "react";

import { ChevronDown } from "lucide-react";

import {
  CollapsibleContent,
  Collapsible as CollapsiblePrimitive,
  CollapsibleTrigger,
} from "@repo/ui";

import { cn } from "@/lib/utils";

export interface ICollapsibleProps {
  title: string;
  children: React.ReactNode;
}

export const Collapsible = ({ title, children }: ICollapsibleProps) => {
  const [open, setOpen] = useState(true);

  return (
    <CollapsiblePrimitive open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger
        className={cn(
          "border-border hover:border-primary hover:text-primary/80 flex w-full items-center justify-between gap-2 border-b py-2",
          "transition-all duration-300 ease-in-out"
        )}
      >
        <p className="text-xl font-bold">{title}</p>
        <ChevronDown
          className={cn("h-4 w-4", open && "rotate-180", "transition-all duration-300 ease-in-out")}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="py-4">{children}</CollapsibleContent>
    </CollapsiblePrimitive>
  );
};
