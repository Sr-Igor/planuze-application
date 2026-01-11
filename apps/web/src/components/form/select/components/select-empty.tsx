import { memo } from "react";

import { PackageOpen } from "lucide-react";

import { useLang } from "@repo/language/hook";
import * as C from "@repo/ui";

interface SelectEmptyProps {
  message?: string;
  useCommandEmpty?: boolean;
  className?: string;
}

export const SelectEmpty = memo(
  ({ message, useCommandEmpty = false, className = "" }: SelectEmptyProps) => {
    const t = useLang();

    const emptyMessage = message || t.helper("no_results");

    if (useCommandEmpty) {
      return (
        <C.CommandEmpty
          className={`flex flex-col items-center justify-center gap-2 p-6 text-xs font-semibold ${className}`}
        >
          <PackageOpen size={26} />
          {emptyMessage}
        </C.CommandEmpty>
      );
    }

    return (
      <div className={`flex h-full flex-col items-center justify-center gap-2 p-4 ${className}`}>
        <PackageOpen size={30} />
        <p className="text-muted-foreground text-center text-xs font-semibold">{emptyMessage}</p>
      </div>
    );
  }
);
