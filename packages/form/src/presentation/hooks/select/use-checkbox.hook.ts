import { useCallback, useMemo, useState } from "react";

import { IUseCheckboxProps } from "../../../shared/types/select.types";

export function useCheckbox<T = any>({ options, value }: IUseCheckboxProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempSelectedValues, setTempSelectedValues] = useState<any[]>(value);
  const [search, setSearch] = useState<string | undefined | null>("");

  const opt = useMemo(() => {
    const searchLower = search?.toLowerCase() || "";
    return options
      ?.filter((option) => option?.label?.toLowerCase().includes(searchLower))
      ?.map((option) => {
        const label = option.label || option.value;

        return {
          label: label?.substring(0, 1)?.toUpperCase() + label?.substring(1),
          value: option.value,
          disabled: option.disabled,
          item: option.item,
        };
      });
  }, [options, search]);

  const handleSetSearch = useCallback((newSearch: string | undefined | null) => {
    setSearch(newSearch);
  }, []);

  return {
    opt,
    isOpen,
    tempSelectedValues,
    search,
    setSearch: handleSetSearch,
    setIsOpen,
    setTempSelectedValues,
  };
}
