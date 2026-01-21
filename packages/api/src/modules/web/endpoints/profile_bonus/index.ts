import type { profile_bonus } from "@repo/types";

import { createSimpleEndpoint } from "../../../../infrastructure/factories/endpoint.factory";
import { logs } from "../../../../shared/constants";

export const profileBonusEndpoint = createSimpleEndpoint<profile_bonus>()({
  basePath: "/api/private/profile_bonus",
  routes: {
    store: "/api/private/profile_bonus/store",
    update: "/api/private/profile_bonus/update",
    destroy: "/api/private/profile_bonus/destroy",
    trash: "/api/private/profile_bonus/trash",
    restore: "/api/private/profile_bonus/restore",
  },
  defaultQuery: {
    include: {
      logs,
      cost_center: true,
    },
  },
});

export type ProfileBonus = profile_bonus;

// Direct function exports for backwards compatibility
export const profileBonusStore = profileBonusEndpoint.store;
export const profileBonusUpdate = profileBonusEndpoint.update;
export const profileBonusDestroy = profileBonusEndpoint.destroy;
export const profileBonusTrash = profileBonusEndpoint.trash;
export const profileBonusRestore = profileBonusEndpoint.restore;
