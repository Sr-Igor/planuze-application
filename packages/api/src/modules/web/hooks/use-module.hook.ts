import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { useAppDispatch, useUserAuth } from "@repo/redux/hooks";
import { set as setModule } from "@repo/redux/store/modules/module/actions";
import type { module as ModuleType, Pagination } from "@repo/types";

import { UseInsertReturn } from "../../../application/hooks";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import { moduleEndpoint } from "../endpoints/module";

export const useModule = (): Pick<UseInsertReturn<ModuleType>, "index"> => {
  const { user, hasProfile, hasTwoAuth } = useUserAuth();

  const indexKey = cacheKeys.module.index(user?.id || "unknown");
  const dispatch = useAppDispatch();

  const index = useQuery<Pagination<ModuleType>>({
    queryKey: indexKey,
    queryFn: () =>
      hasProfile && hasTwoAuth ? moduleEndpoint.indexPrivate() : moduleEndpoint.indexPublic(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (index?.data?.data) dispatch(setModule({ all: index.data.data }));
  }, [index.data]);

  return { index };
};
