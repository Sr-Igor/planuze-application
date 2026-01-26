import type { module as ModuleType, Pagination } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";
import type {
  ModuleIndexQuery,
  ModuleStoreDTO,
  ModuleUpdateDTO,
  ModuleUpdateParams,
} from "./module.types";

export const moduleEndpoint = {
  index: (query?: ModuleIndexQuery) =>
    typedRequest<Pagination<ModuleType>>()({
      route: "/manager/private/module/index",
      query: {
        ...query,
        include: {
          company: {
            select: {
              name: true,
            },
          },
        },
      },
    }),
  store: (body: ModuleStoreDTO) =>
    typedRequest<ModuleType>()(
      { route: "/manager/private/module/store", body },
      { showSuccess: true }
    ),
  update: (params: ModuleUpdateParams, body: ModuleUpdateDTO) =>
    typedRequest<ModuleType>()(
      { route: "/manager/private/module/update", params, body },
      { showSuccess: true }
    ),
};
