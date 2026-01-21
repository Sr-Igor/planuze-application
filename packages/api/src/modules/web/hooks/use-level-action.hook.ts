import { useMutation } from "@tanstack/react-query";

import type { level, level_action } from "@repo/types";

import { useCache } from "../../../infrastructure/cache/cache.service";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import { levelActionEndpoint, type LevelActionUpdateBody } from "../endpoints/level_action";

export interface UseLevelActionCallbacks {
  update?: {
    onSuccess?: (data: level_action[]) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UseLevelActionProps {
  id?: string;
  callbacks?: UseLevelActionCallbacks;
}

export const useLevelAction = ({ callbacks, id }: UseLevelActionProps = {}) => {
  const showKey = cacheKeys.level.show(id);
  const cache = useCache();

  const update = useMutation({
    mutationFn: (body: LevelActionUpdateBody) =>
      levelActionEndpoint.update(id!, body),
    onSuccess: (e, variables) => {
      const moduleId = variables?.module_id;

      cache.setQueriesData(showKey, (oldData: level | undefined) => {
        if (!oldData) return oldData as any;
        const oldLevelActions = (oldData?.level_actions || [])?.filter(
          (la: level_action) => (la as any).feature?.module_id !== moduleId
        );

        return {
          ...oldData,
          level_actions: [...oldLevelActions, ...(Array.isArray(e) ? e : [e])],
        };
      });

      callbacks?.update?.onSuccess?.(Array.isArray(e) ? e : [e as level_action]);
    },
    onError: callbacks?.update?.onError,
  });

  return { update };
};
