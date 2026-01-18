"use client";

import { memo, useCallback, useState } from "react";

import { Search, X } from "lucide-react";

import { useLang } from "@repo/language/hooks";
import { Button, Input } from "@repo/ui-new";

interface FileSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  debounceMs?: number;
}

let timer: NodeJS.Timeout;

export const FileSearch = memo(
  ({ value, onChange, placeholder, className = "", debounceMs = 300 }: FileSearchProps) => {
    const t = useLang();

    const [inputValue, setInputValue] = useState(value);

    const handleClear = useCallback(() => {
      onChange("");
      setInputValue("");
    }, [onChange]);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        if (newValue === "") {
          onChange("");
        }

        clearTimeout(timer);
        timer = setTimeout(() => {
          onChange(newValue);
        }, debounceMs);
      },
      [onChange, debounceMs]
    );

    return (
      <div className={`relative max-w-[200px] ${className}`}>
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            value={inputValue}
            onChange={handleChange}
            placeholder={placeholder || t.helper("search")}
            className="h-9 pr-10 pl-10"
          />
          {value && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="hover:bg-muted absolute top-1/2 right-1 h-6 w-6 -translate-y-1/2 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    );
  }
);

FileSearch.displayName = "FileSearch";
