import { useMutation } from "@tanstack/react-query";

import type { integration, integration_action } from "@repo/types";

import { useCache } from "../../../infrastructure/cache/cache.service";
import { cacheKeys } from "../../../infrastructure/cache/keys";
import {
  integrationActionEndpoint,
  type IntegrationActionUpdateBody,
} from "../endpoints/integration_action";

export interface UseIntegrationActionCallbacks {
  update?: {
    onSuccess?: (data: integration_action[]) => void;
    onError?: (error: unknown) => void;
  };
}

export interface UseIntegrationActionProps {
  id?: string;
  callbacks?: UseIntegrationActionCallbacks;
}

export const useIntegrationAction = ({ callbacks, id }: UseIntegrationActionProps = {}) => {
  const showKey = cacheKeys.integration.show(id);
  const cache = useCache();

  const update = useMutation({
    mutationFn: (body: IntegrationActionUpdateBody) =>
      integrationActionEndpoint.update(id!, body),
    onSuccess: (e, variables) => {
      const moduleId = variables?.module_id;

      cache.setQueriesData(showKey, (oldData: integration | undefined) => {
        if (!oldData) return oldData as any;
        const oldIntegrationActions = (oldData?.integration_actions || [])?.filter(
          (la: integration_action) => (la as any).feature?.module_id !== moduleId
        );

        return {
          ...oldData,
          integration_actions: [...oldIntegrationActions, ...(Array.isArray(e) ? e : [e])],
        };
      });

      callbacks?.update?.onSuccess?.(Array.isArray(e) ? e : [e as integration_action]);
    },
    onError: callbacks?.update?.onError,
  });

  return { update };
};
