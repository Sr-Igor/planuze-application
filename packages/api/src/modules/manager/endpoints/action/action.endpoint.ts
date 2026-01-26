import type { action, Pagination } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";
import type {
  ActionIndexQuery,
  ActionStoreDTO,
  ActionUpdateDTO,
  ActionUpdateParams,
} from "./action.types";

export const actionEndpoint = {
  index: (query?: ActionIndexQuery) =>
    typedRequest<Pagination<action>>()({ route: "/manager/private/action/index", query }),
  store: (body: ActionStoreDTO) =>
    typedRequest<action>()({ route: "/manager/private/action/store", body }, { showSuccess: true }),
  update: (params: ActionUpdateParams, body: ActionUpdateDTO) =>
    typedRequest<action>()(
      { route: "/manager/private/action/update", params, body },
      { showSuccess: true }
    ),
};
