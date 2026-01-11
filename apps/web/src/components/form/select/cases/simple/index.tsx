"use client";

import { memo, useCallback, useMemo, useState } from "react";

import { useLang } from "@repo/language/hook";
import { Popover, PopoverTrigger } from "@repo/ui";
import * as C from "@repo/ui";

import { cn } from "@/lib/utils";

import {
  SelectContent,
  SelectEmpty,
  SelectItem,
  SelectList,
  SelectLoading,
  SelectSearch,
  SelectTrigger,
} from "../../components";
import { useSimpleData } from "../../hooks";
import { ISimpleSelectProps } from "../../types";

export const SimpleSelect = memo(
  ({
    options = [],
    placeholder,
    value = null,
    onChange,
    className,
    triggerClassName,
    disabled = false,
    loading = false,
    containerClassName,
    modal,
    clearable = true,
    formatterOptions,
    customTrigger,
    customSelect,
  }: ISimpleSelectProps) => {
    const t = useLang();

    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    const { opt, selected } = useSimpleData({ options, value });

    const filteredOptions = useMemo(
      () => opt.filter((option) => option.label.toLowerCase().includes(search.toLowerCase())),
      [opt, search]
    );

    const handleSelect = useCallback(
      (selectedValue: string, selectedItem: any) => {
        const newValue = selectedValue === value ? null : selectedValue;
        if (!newValue && !clearable) {
          setIsOpen(false);
          return;
        }
        onChange?.(newValue, selectedItem);
        setIsOpen(false);
      },
      [value, clearable, onChange]
    );

    const handleClear = useCallback(() => {
      setSearch("");
      onChange?.(null);
      setIsOpen(false);
    }, [onChange]);

    const handleSetSearch = useCallback((value: string | null) => {
      setSearch(value || "");
    }, []);

    const showValue = value && !loading ? selected?.label || t.helper("deleted_info") : undefined;

    const isDeleted = showValue === t.helper("deleted_info");

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen} modal={modal}>
        <PopoverTrigger
          disabled={disabled}
          className={cn(disabled && "pointer-events-none", triggerClassName)}
        >
          {customTrigger && !isDeleted ? (
            customTrigger({ selected, disabled })
          ) : (
            <SelectTrigger
              placeholder={placeholder || t.helper("select")}
              value={showValue}
              loading={loading}
              className={className}
              isDeleted={isDeleted}
              disabled={disabled}
              selected={selected}
              customSelect={customSelect}
            />
          )}
        </PopoverTrigger>
        <SelectContent modal={modal} className={containerClassName}>
          <C.Command shouldFilter={false}>
            <SelectSearch
              search={search}
              setSearch={handleSetSearch}
              onClear={handleClear}
              placeholder={t.helper("search")}
              useCommandInput={true}
              clearable={clearable}
            />

            <SelectList useCommandList={true} loading={loading}>
              {loading && filteredOptions.length === 0 && <SelectLoading useLoaderCircle={true} />}

              {!loading && filteredOptions.length === 0 && (
                <SelectEmpty message={t.helper("no_results")} useCommandEmpty={true} />
              )}

              <C.CommandGroup>
                {filteredOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    checked={value === option.value}
                    disabled={option.disabled}
                    onSelect={() => !option.disabled && handleSelect(option.value, option.item)}
                    showCheckIcon={true}
                    useCommandItem={true}
                  >
                    {formatterOptions?.(option) || option.label}
                  </SelectItem>
                ))}
              </C.CommandGroup>
            </SelectList>
          </C.Command>
        </SelectContent>
      </Popover>
    );
  }
);
