import { useCallback } from "react";

import { useLang } from "@repo/language/hook";

export const useDisplayValue = <T>(
  conversor?: Partial<Record<keyof T, { label: string; value: string }[]>>
) => {
  const t = useLang();

  return useCallback(
    (field: keyof T | undefined, value: any): string => {
      let v = value;

      // Conversor value → label
      if (field && conversor?.[field]) {
        const opts = conversor[field]!;
        const mapOne = (x: any) => opts.find((o) => String(o.value) === String(x))?.label ?? null;

        v = Array.isArray(v) ? v.map(mapOne).join(", ") : mapOne(v);
      }

      // Boolean
      if (typeof v === "boolean") {
        return v ? t.helper("true") : t.helper("false");
      }

      // null / undefined / string vazia / apenas espaços
      if (v === null || v === undefined || v === "" || (typeof v === "string" && v.trim() === "")) {
        return `[${t.helper("empty")}]`;
      }

      // Data
      const dateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
      if (dateRegex.test(v)) {
        return new Date(v).toLocaleString("pt-BR");
      }

      // Object
      if (typeof v === "object") {
        return JSON.stringify(v);
      }

      // Fallback
      return String(v);
    },
    [conversor, t]
  );
};
