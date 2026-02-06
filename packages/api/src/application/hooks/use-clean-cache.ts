import { useQueryClient } from "@tanstack/react-query";

import { CacheKeyName, cacheKeys } from "../../infrastructure/cache/keys";

export interface IClearCacheByBatch {
  keys: CacheKeyName[] | string[];
  clearSimilar?: boolean;
}

export const useCleanCache = () => {
  const queryClient = useQueryClient();

  const cleanCacheByBatch = ({ keys, clearSimilar }: IClearCacheByBatch) => {
    keys.forEach((key) => {
      const targetKey = key as string;

      if (clearSimilar) {
        Object.keys(cacheKeys).forEach((systemKey) => {
          if (systemKey.startsWith(targetKey)) {
            const group = cacheKeys[systemKey as CacheKeyName];
            if (group) {
              Object.values(group).forEach((fn) => {
                if (typeof fn === "function") {
                  const [queryKey] = fn();
                  queryClient.invalidateQueries({ queryKey: [queryKey] });
                }
              });
            }
          }
        });
      } else {
        const group = cacheKeys[key];
        if (group) {
          Object.values(group).forEach((fn) => {
            if (typeof fn === "function") {
              const [queryKey] = fn();
              queryClient.invalidateQueries({ queryKey: [queryKey] });
            }
          });
        }
      }
    });
  };

  return { cleanCacheByBatch };
};
