import { useEffect, useMemo, useRef } from "react";

import { useRouter } from "next/navigation";

import { paginationSchema, usePaginationParams } from "@repo/hooks";

import { IUsePageProps } from "../types";

export const usePage = ({ index, handleState, state, baseFilters }: IUsePageProps) => {
  const { push } = useRouter();

  const { params: urlParams, setParams, resetParams } = usePaginationParams(paginationSchema);

  const lastUpdate = useRef<"url" | "state" | null>(null);

  useEffect(() => {
    if (
      JSON.stringify(state.filters) !== JSON.stringify(urlParams) &&
      lastUpdate.current !== "state"
    ) {
      lastUpdate.current = "url";
      handleState({ filters: urlParams });
    }
  }, [urlParams, handleState]);

  useEffect(() => {
    if (
      JSON.stringify(state.filters) !== JSON.stringify(urlParams) &&
      lastUpdate.current !== "url"
    ) {
      lastUpdate.current = "state";
      setParams(state.filters);
    }
  }, [state.filters, urlParams, setParams]);

  useEffect(() => {
    lastUpdate.current = null;
  });

  useEffect(() => {
    const pages = index.data?.pages;
    const page = index.data?.page;
    if (pages && page && page > pages) {
      handleState({ filters: { ...state.filters, page: pages } });
    }
  }, [index.data?.pages, index.data?.page, state.filters, handleState]);

  useEffect(() => {
    if (index.error?.cause === "internal") {
      handleState({ filters: baseFilters as any });
      resetParams();
    }
  }, [index.error, handleState, baseFilters, resetParams]);

  const isInitialState = useMemo(
    () => JSON.stringify(baseFilters) === JSON.stringify(state.filters),
    [baseFilters, state.filters]
  );

  return {
    push,
    isInitialState,
  };
};
