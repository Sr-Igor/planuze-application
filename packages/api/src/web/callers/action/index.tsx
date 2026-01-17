import { useEffect } from "react";

import * as api from "#/web/req/action";
import keys from "#/cache/keys";
import { useQuery } from "@tanstack/react-query";

import { action } from "@repo/types";
import { useAppDispatch } from "@repo/redux/hook";
import { set } from "@repo/redux/store/modules/module/actions";

import { Pagination } from "../../../@types";

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
