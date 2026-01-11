import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { action } from "@repo/api/generator/types";

import keys from "@/api/cache/keys";
import * as api from "@/api/req/action";
import { useAppDispatch } from "@/hooks/redux";
import { set } from "@/store/modules/module/actions";
import { Pagination } from "@/types/pagination";

export const useAction = () => {
  const indexKey = keys.action.index();
  const dispatch = useAppDispatch();

  const index = useQuery<Pagination<action>>({
    queryKey: indexKey,
    queryFn: () => api.index(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (index?.data?.data) dispatch(set({ actions: index.data.data }));
  }, [index.data]);

  return { index };
};
