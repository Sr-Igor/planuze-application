import { useMemo } from "react";

import { IUseSimpleDataProps } from "../../../shared/types/select.types";

export function useSimpleData<T = any>({ options, value }: IUseSimpleDataProps<T>) {
  const opt = useMemo(() => {
    return options.map((option) => {
      const label = option.label || option.value;

      return {
        label: label?.substring(0, 1)?.toUpperCase() + label?.substring(1),
        value: option.value,
        disabled: option.disabled,
        item: option.item,
      };
    });
  }, [options]);

  const selected = useMemo(() => {
    if (!value) return null;
    return opt.find((option) => option.value === value);
  }, [opt, value]);

  return {
    opt,
    selected,
  };
}
