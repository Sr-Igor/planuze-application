import type { feature, Pagination } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";
import type {
  FeatureIndexQuery,
  FeatureStoreDTO,
  FeatureUpdateDTO,
  FeatureUpdateParams,
} from "./feature.types";

export const featureEndpoint = {
  index: (query?: FeatureIndexQuery) =>
    typedRequest<Pagination<feature>>()({
      route: "/manager/private/feature/index",
      query: { ...query, include: { module: true } },
    }),
  store: (body: FeatureStoreDTO) =>
    typedRequest<feature>()(
      { route: "/manager/private/feature/store", body },
      { showSuccess: true }
    ),
  update: (params: FeatureUpdateParams, body: FeatureUpdateDTO) =>
    typedRequest<feature>()(
      { route: "/manager/private/feature/update", params, body },
      { showSuccess: true }
    ),
};
