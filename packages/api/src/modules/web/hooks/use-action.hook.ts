import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { useAppDispatch, useAuth } from "@repo/redux/hook";
import { set as setModule } from "@repo/redux/store/modules/module/actions";
import type { action, Pagination } from "@repo/types";

import { UseInsertReturn } from "../../../application/hooks";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import { actionEndpoint } from "../endpoints/action";

export const useAction = (): Pick<UseInsertReturn<action>, "index"> => {
  const { user } = useAuth();

  const indexKey = cacheKeys.action.index(user?.id || "unknown");
  const dispatch = useAppDispatch();

  const index = useQuery<Pagination<action>>({
    queryKey: indexKey,
    queryFn: () => actionEndpoint.index(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (index?.data?.data) dispatch(setModule({ actions: index.data.data }));
  }, [index.data]);

  return { index };
};
