"use client";

import { memo, useCallback } from "react";

import { useLang } from "@repo/language/hook";
import { Popover, PopoverTrigger } from "@repo/ui";
import * as C from "@repo/ui";

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
import { useCheckbox, useCheckboxHandlers } from "../../hooks";
import { ICheckboxSelectProps } from "../../types";

export const CheckboxSelect = memo(
  ({
    options = [],
    placeholder,
    value = [],
    onChange,
    className,
    disabled = false,
    loading = false,
    optionChildren,
    containerClassName,
    triggerClassName,
    modal,
  }: ICheckboxSelectProps) => {
    const t = useLang();

    const { opt, isOpen, tempSelectedValues, search, setSearch, setIsOpen, setTempSelectedValues } =
      useCheckbox({
        options,
        value,
      });

    const { handleCheckboxChange, handleApply, handleClear, handleClose } = useCheckboxHandlers({
      setValues: setTempSelectedValues,
      values: tempSelectedValues,
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

    return (
      <Popover open={isOpen} onOpenChange={handleOpenChange} modal={modal}>
        <PopoverTrigger
          disabled={disabled}
          className={cn("w-full", disabled && "pointer-events-none", triggerClassName)}
        >
          <SelectTrigger
            placeholder={placeholder || t.helper("select")}
            value={value}
            loading={loading}
            className={className}
            showBadge={value.length > 0}
            badgeCount={value.length}
            isDeleted={false}
            disabled={disabled}
          />
        </PopoverTrigger>
        <SelectContent modal={modal} className={containerClassName}>
          <C.Command shouldFilter={false}>
            <SelectSearch
              search={search}
              setSearch={setSearch}
              onClear={handleClear}
              placeholder={t.helper("search")}
              useCommandInput={true}
            />

            <SelectList useCommandList={true} loading={loading}>
              {loading && opt.length === 0 && <SelectLoading useLoaderCircle={true} />}

              {!loading && opt.length === 0 && (
                <SelectEmpty message={t.helper("no_results")} useCommandEmpty={true} />
              )}

              <C.CommandGroup>
                {opt.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    label={option.label}
                    checked={tempSelectedValues.includes(option.value)}
                    disabled={option.disabled}
                    onSelect={() => {
                      !option.disabled &&
                        handleCheckboxChange(
                          option.value,
                          !tempSelectedValues.includes(option.value)
                        );
                    }}
                    onCheckedChange={(checked) => {
                      !option.disabled && handleCheckboxChange(option.value, checked);
                    }}
                    showCheckbox={true}
                    useCommandItem={true}
                  >
                    {optionChildren?.(option)}
                  </SelectItem>
                ))}
              </C.CommandGroup>
            </SelectList>

            <SelectFooter onApply={handleApply} />
          </C.Command>
        </SelectContent>
      </Popover>
    );
  }
);
