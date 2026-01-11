"use client";

import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

import { useLang } from "@repo/language/hook";
import { Popover, PopoverTrigger } from "@repo/ui";
import * as C from "@repo/ui";

import { useDebounce } from "@repo/hooks/debounce";
import { cn } from "@/lib/utils";

import {
  SelectContent,
  SelectEmpty,
  SelectFooter,
  SelectItem,
  SelectList,
  SelectLoading,
  SelectSearch,
  SelectTrigger,
} from "../../components";
import { useCheckboxHandlers, useInfinity } from "../../hooks";
import { ISimpleInfinityProps } from "../../types";

export const CheckboxInfinitySelect = memo(function CheckboxInfinitySelect<T>({
  value,
  onChange,
  onChangeCallback,
  className,
  placeholder,
  disabled = false,
  fallbackValue,
  formatterOptions,
  customTrigger,
  containerClassName,
  modal,
  search: externalSearch,
  setSearch: setExternalSearch,
  ...rest
}: ISimpleInfinityProps<T>) {
  const t = useLang();

  const [isOpen, setIsOpen] = useState(false);
  const [internalSearch, setInternalSearch] = useState("");
  const [pageSearch, setPageSearch] = useState("");

  const search = externalSearch || pageSearch;
  const setSearch = setExternalSearch || setPageSearch;

  const [values, setValues] = useState<string[]>([]);

  const inputDebounced = useDebounce(internalSearch, 300);
  const isDebouncing = internalSearch !== inputDebounced;

  useEffect(() => {
    setSearch?.(inputDebounced || "");
  }, [inputDebounced]);

  const { index, items, handleScroll } = useInfinity({
    ...rest,
    value,
    inputDebounced: search || "",
    open: isOpen,
  });

  const { handleCheckboxChange, handleApply, handleClear, handleClose } = useCheckboxHandlers({
    setValues,
    values,
    onChange,
    value,
    setIsOpen,
    isOpen,
  });

  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) {
        handleClose();
      } else {
        setIsOpen(open);
      }
    },
    [handleClose, setIsOpen]
  );

  const badgeCount = useMemo(() => {
    return Array.isArray(value) ? value.length : value?.split(",")?.filter(Boolean).length || 0;
  }, [value]);

  const selectedValue = Array.isArray(value) ? value : value?.split(",")?.filter(Boolean) || [];

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange} modal={modal}>
      <PopoverTrigger
        disabled={disabled}
        className={cn("w-full", disabled && "pointer-events-none")}
      >
        {customTrigger ? (
          customTrigger({ disabled })
        ) : (
          <SelectTrigger
            placeholder={placeholder || t.helper("select")}
            value={selectedValue}
            className={className}
            showBadge={badgeCount > 0}
            badgeCount={badgeCount}
            isDeleted={false}
            disabled={disabled}
          />
        )}
      </PopoverTrigger>
      <SelectContent modal={modal} className={containerClassName}>
        <C.Command shouldFilter={false}>
          <SelectSearch
            search={internalSearch}
            setSearch={(value) => setInternalSearch(value || "")}
            onClear={handleClear}
            placeholder={t.helper("search")}
            useCommandInput={true}
            loading={index.isLoading || isDebouncing}
          />

          <SelectList
            onScroll={handleScroll}
            useCommandList={true}
            loading={(index.isLoading || isDebouncing) && !items?.length}
          >
            {(index.isLoading || isDebouncing) && !items?.length && (
              <SelectLoading useLoaderCircle={true} />
            )}
            {!index.isLoading && !isDebouncing && !items.length && (
              <SelectEmpty message={t.helper("no_results")} useCommandEmpty={true} />
            )}

            <C.CommandGroup>
              {items.map((item) => (
                <SelectItem
                  key={`${item.value}-${item.label}`}
                  value={item.value}
                  label={item.label}
                  checked={values.includes(item.value)}
                  disabled={item.disabled}
                  onSelect={() => {
                    !item.disabled &&
                      handleCheckboxChange(item.value, !values.includes(item.value));
                  }}
                  onCheckedChange={(checked) =>
                    !item.disabled && handleCheckboxChange(item.value, checked)
                  }
                  showCheckbox={true}
                  useCommandItem={true}
                >
                  {formatterOptions?.(item.item) || item.label}
                </SelectItem>
              ))}

              {index.isFetchingNextPage && (
                <SelectLoading
                  size={16}
                  text={t.helper("loading_more")}
                  className="p-2"
                  useLoaderCircle={true}
                />
              )}
            </C.CommandGroup>
          </SelectList>

          <SelectFooter onApply={handleApply} />
        </C.Command>
      </SelectContent>
    </Popover>
  );
}) as <T>(props: ISimpleInfinityProps<T>) => React.JSX.Element;
