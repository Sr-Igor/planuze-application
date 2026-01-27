"use client";

import * as React from "react";

import * as icons from "lucide-react";
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { List, useListRef } from "react-window";

import { useLang } from "@repo/language/hooks";
import {
  Button,
  cn,
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  Icon,
  Popover,
  PopoverContentInModal,
  PopoverTrigger,
} from "@repo/ui";

export interface IIconProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

interface IconRowData {
  items: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  setOpen: (open: boolean) => void;
}

const IconRow = React.memo(
  ({
    index,
    style,
    ariaAttributes,
    items,
    selectedValue,
    onChange,
    setOpen,
  }: {
    index: number;
    style: React.CSSProperties;
    ariaAttributes: any;
  } & IconRowData) => {
    const icon = items[index];
    if (!icon) return null;

    return (
      <div style={{ ...style, display: "flex", alignItems: "center" }} {...ariaAttributes}>
        <CommandItem
          key={`${icon.label}-${icon.value}`}
          value={icon.value}
          onSelect={(currentValue) => {
            onChange(currentValue === selectedValue ? "" : currentValue);
            setOpen(false);
          }}
          className="w-full cursor-pointer"
        >
          <Icon name={icon.value} className="mr-2" />
          <span className="line-clamp-1 truncate text-sm font-normal capitalize">{icon.label}</span>
          <CheckIcon
            className={cn("ml-auto", selectedValue === icon.value ? "opacity-100" : "opacity-0")}
          />
        </CommandItem>
      </div>
    );
  }
);

IconRow.displayName = "IconRow";

export function Icons({ value, onChange, className, disabled = false }: Readonly<IIconProps>) {
  const t = useLang();
  const input = React.useRef<HTMLInputElement>(null);

  const listRef = useListRef(null);

  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const data = React.useMemo(() => {
    return Object.keys(icons)
      .filter((icon) => icon !== "icons" && icon !== "createLucideIcon")
      .map((icon) => ({
        label: icon,
        value: icon,
      }));
  }, []);

  const filteredData = React.useMemo(() => {
    if (!search) return data;
    const lowerSearch = search.toLowerCase();
    return data.filter((icon) => icon.label.toLowerCase().includes(lowerSearch));
  }, [data, search]);

  const selected = React.useMemo(
    () =>
      data.find((icon) => icon.value?.toLowerCase() === value?.toLowerCase()) || { label: value },
    [data, value]
  );

  const rowProps = React.useMemo<IconRowData>(
    () => ({
      items: filteredData,
      selectedValue: value,
      onChange,
      setOpen,
    }),
    [filteredData, value, onChange, setOpen]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn("w-full justify-between disabled:hover:bg-transparent", className)}
        >
          <span className="line-clamp-1 flex min-w-0 items-center truncate text-left text-sm font-normal capitalize">
            <Icon name={selected?.label} className="mr-2 flex-shrink-0" />
            <span className="truncate">{selected?.label || t.helper("select_a_icon")}</span>
          </span>
          <span className="text-muted-foreground pointer-events-none flex items-center gap-1">
            <ChevronsUpDown className="text-muted-foreground" />
          </span>
        </Button>
      </PopoverTrigger>

      <PopoverContentInModal
        className="w-(--radix-popover-trigger-width) p-0"
        style={{ maxHeight: 300, minWidth: 250, overflow: "visible" }}
      >
        <Command>
          <CommandInput
            ref={input}
            maxLength={50}
            placeholder={t.helper("search_a_icon") + "..."}
            value={search}
            onValueChange={setSearch}
          />
          {filteredData.length === 0 ? (
            <CommandEmpty>{t.helper("not_found_icon")}</CommandEmpty>
          ) : (
            <List<IconRowData>
              listRef={listRef}
              rowCount={filteredData.length}
              rowHeight={36}
              rowProps={rowProps}
              rowComponent={(props) => <IconRow {...props} />}
              style={{
                height: "280px",
                width: "100%",
                outline: "none",
              }}
              className="scrollbar-thin scrollbar-thumb-gray-300"
            />
          )}
        </Command>
      </PopoverContentInModal>
    </Popover>
  );
}
