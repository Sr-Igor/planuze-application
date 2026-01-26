import { useEffect, useMemo, useRef } from "react";

import { useRouter } from "next/navigation";

import { baseFilterParams, paginationSchema, usePaginationParams } from "@repo/hooks";

import { IUsePageProps } from "../types";

export const usePage = <T extends { id: string }>({
  index,
  handleState,
  state,
}: IUsePageProps<T>) => {
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
  }, [urlParams]);

  useEffect(() => {
    if (
      JSON.stringify(state.filters) !== JSON.stringify(urlParams) &&
      lastUpdate.current !== "url"
    ) {
      lastUpdate.current = "state";
      setParams(state.filters);
    }
  }, [state.filters, setParams]);

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
      resetParams();
    }
  }, [index.error, resetParams]);

  const isBusy = useMemo(
    () => index.isLoading || state.loadingLines.length > 0,
    [index.isLoading, state.loadingLines]
  );

  const isInitialState = useMemo(
    () => JSON.stringify(baseFilterParams) === JSON.stringify(state.filters),
    [state.filters]
  );

  return {
    push,
    isBusy,
    isInitialState,
  };
};
