import { History, Minus, X } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button } from "@repo/ui";

export interface IHeaderProps {
  setChat: React.Dispatch<React.SetStateAction<any>>;
  setLocalMessages: React.Dispatch<React.SetStateAction<any[]>>;
  setHistoryOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Header = ({ setChat, setLocalMessages, setHistoryOpen, setOpen }: IHeaderProps) => {
  const t = useLang();

  return (
    <div className="flex w-full min-w-0 items-center justify-between border-b border-gray-300 p-2 sm:p-4 dark:border-gray-700">
      <p className="truncate text-xs sm:text-base">{t.chat("title")}</p>
      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setChat(undefined);
            setLocalMessages([]);
          }}
          title={t.chat("new_chat")}
          className="h-7 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm"
        >
          {t.chat("new_chat")}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setHistoryOpen(true)}
          title={t.chat("history")}
          className="h-7 w-7 sm:h-9 sm:w-9"
        >
          <History />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(false)}
          title={t.chat("minimize")}
          className="h-7 w-7 sm:h-9 sm:w-9"
        >
          <Minus />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setOpen(false);
            setChat(undefined);
            setLocalMessages([]);
          }}
          title={t.chat("close")}
          className="h-7 w-7 sm:h-9 sm:w-9"
        >
          <X />
        </Button>
      </div>
    </div>
  );
};
