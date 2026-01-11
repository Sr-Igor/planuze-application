import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { module } from "@repo/api/generator/types";

import keys from "@/api/cache/keys";
import * as api from "@/api/req/module";
import { useAuth } from "@/hooks/auth";
import { useAppDispatch } from "@/hooks/redux";
import { set } from "@/store/modules/module/actions";
import { Pagination } from "@/types/pagination";

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
