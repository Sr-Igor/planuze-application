import { useState } from "react";

import { ChevronDown, Save } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button, Popover, PopoverContent, PopoverTrigger } from "@repo/ui-new";

import { cn } from "@repo/ui-new";

export interface ISaveButtonProps {
  isDisabled: boolean;
  loading?: boolean;
  handleSubmit: (close?: boolean) => void;
}

export const SaveButton = ({ isDisabled, loading, handleSubmit }: ISaveButtonProps) => {
  const t = useLang();
  const tKanban = t.page.kanban;

  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "bg-foreground flex items-center overflow-hidden rounded-md transition-all duration-300 ease-in-out hover:opacity-80",
        isDisabled && "pointer-events-none opacity-50"
      )}
    >
      <Button
        className="text-background bg-foreground border-background rounded-none border-r"
        loading={loading}
        disabled={isDisabled}
        onClick={() => handleSubmit(true)}
      >
        <Save />
        <span className="hidden xl:block">{tKanban("card-form-edit.save_and_close")}</span>
      </Button>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className="text-background bg-foreground rounded-none">
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-0">
          <Button
            className="flex w-full items-center justify-start gap-2"
            variant="outline"
            disabled={isDisabled}
            onClick={() => {
              setOpen(false);
              handleSubmit(false);
            }}
          >
            <Save />
            {tKanban("card-form-edit.save")}
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
};
