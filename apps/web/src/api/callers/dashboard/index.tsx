import { useMutation, useQuery } from "@tanstack/react-query";

import keys from "@/api/cache/keys";
import * as api from "@/api/req/dashboard";
import { IUseCallerProps } from "@/api/types";
import { getModule } from "@/hooks/cookies/module";
import { useIntlFormat } from "@/hooks/intl-format";
import { useAppSelector } from "@/hooks/redux";

export const useDashboard = (props: IUseCallerProps<any>) => {
  const moduleIdCookie = getModule();
  const { money } = useIntlFormat();

  const { moduleId: moduleIdStore } = useAppSelector((state) => state.module);
  const moduleId = moduleIdCookie || moduleIdStore;

  const filters = Object.keys(props?.filters || {}).reduce(
    (acc, key) => {
      const deletedKeys = ["project_tab", "personal_tab"];
      if (deletedKeys.includes(key)) return acc;

      const value = props?.filters?.[key];
      if (Array.isArray(value) ? !!value.length : value) {
        return {
          ...acc,
          [key]: Array.isArray(value) ? value.join(",") : value,
        };
      }
      return acc;
    },
    {
      convert_currency: props?.filters?.convert_currency || money.currency,
    }
  );

  const indexKey = keys.dashboard.index({
    moduleId,
    ...filters,
  });

  const index = useQuery({
    queryKey: indexKey,
    queryFn: () => api.index(filters),
  });

  const exported = useMutation({
    mutationKey: keys.dashboard.export(filters),
    mutationFn: () => api.exported({ ...filters, export: true }),
  });

  return { index, exported };
};
