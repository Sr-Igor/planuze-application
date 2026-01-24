import { useEffect } from "react";

import * as api from "#/web/req/module";
import keys from "#/cache/keys";
import { useQuery } from "@tanstack/react-query";

import { module } from "@repo/types";
import { useAppDispatch, useAuth } from "@repo/redux/hook";
import { set } from "@repo/redux/store/modules/module/actions";

import { Pagination } from "../../../@types";

export const useModule = () => {
  const { user, hasProfile, hasTwoAuth } = useAuth();

  const indexKey = keys.module.index(user?.id || "unknown");
  const dispatch = useAppDispatch();

  const index = useQuery<Pagination<module>>({
    queryKey: indexKey,
    queryFn: () => (hasProfile && hasTwoAuth ? api.indexPrivate() : api.indexPublic()),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (index?.data?.data) dispatch(set({ all: index.data.data }));
  }, [index.data]);

  return { index };
};
