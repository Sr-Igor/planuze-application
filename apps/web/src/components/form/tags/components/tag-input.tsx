import { useRef } from "react";

import { useLang } from "@repo/language/hook";
import { CommandInput } from "@repo/ui";

import { ISelected } from "../types";

interface TagInputProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddTag: (title: string) => void;
  selected: ISelected[];
}

export function TagInput({ searchTerm, onSearchChange, onAddTag, selected }: TagInputProps) {
  const t = useLang();
  const input = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      e.preventDefault();

      const itemExists = selected.find(
        (item) => item.title.toLowerCase() === searchTerm.trim().toLowerCase()
      );

      if (!itemExists) {
        onAddTag(searchTerm.trim());
      }
      onSearchChange("");
    }
  };

  return (
    <CommandInput
      ref={input}
      maxLength={50}
      placeholder={t.helper("search") + "..."}
      value={searchTerm}
      onValueChange={onSearchChange}
      onKeyDown={handleKeyDown}
    />
  );
}
