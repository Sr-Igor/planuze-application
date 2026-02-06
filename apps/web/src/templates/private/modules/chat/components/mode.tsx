import { useState } from "react";

import { Bot, MessageCircleCode, Zap } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button, cn, Popover, PopoverContent, PopoverTrigger } from "@repo/ui";

export type Modes = "ASK" | "ACTION" | "AUTO";

export interface IModeProps {
  mode: Modes;
  setMode: (mode: Modes) => void;
  disabled?: boolean;
}

export const Mode = ({ mode, setMode, disabled }: IModeProps) => {
  const t = useLang();

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className={cn(
            "h-9 w-9 shrink-0 sm:h-10 sm:w-10",
            mode === "ACTION" && "text-amber-500 hover:text-amber-600",
            mode === "ASK" && "text-green-500 hover:text-green-600"
          )}
          disabled={disabled}
        >
          {mode === "ASK" && <MessageCircleCode className="h-4 w-4 sm:h-5 sm:w-5" />}

          {mode === "ACTION" && <Zap className="h-4 w-4 sm:h-5 sm:w-5" />}

          {mode === "AUTO" && <Bot className="h-4 w-4 sm:h-5 sm:w-5" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-9999 w-auto p-1" align="end" side="top">
        <div className="flex items-center gap-2 border-b border-gray-300 p-2 dark:border-gray-700">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            {t.chat("modes.title")}
          </p>
        </div>
        <div className="flex flex-col gap-1">
          <Button
            type="button"
            variant={mode === "AUTO" ? "secondary" : "ghost"}
            className="justify-start gap-2"
            onClick={() => {
              setMode("AUTO");
              setOpen(false);
            }}
          >
            <div className="flex w-full items-center justify-start gap-2">
              <Bot className="h-4 w-4" />
              <span className="text-sm font-medium">{t.chat("modes.auto")}</span>
            </div>
          </Button>
          <Button
            type="button"
            variant={mode === "ASK" ? "secondary" : "ghost"}
            className="justify-start gap-2"
            onClick={() => {
              setMode("ASK");
              setOpen(false);
            }}
          >
            <div className="flex w-full items-center justify-start gap-2">
              <MessageCircleCode className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">{t.chat("modes.ask")}</span>
            </div>
          </Button>
          <Button
            type="button"
            variant={mode === "ACTION" ? "secondary" : "ghost"}
            className="justify-start gap-2"
            onClick={() => {
              setMode("ACTION");
              setOpen(false);
            }}
          >
            <div className="flex w-full items-center justify-start gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">{t.chat("modes.action")}</span>
            </div>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
