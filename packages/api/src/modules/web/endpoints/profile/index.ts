// Direct function exports for backwards compatibility
import { profileEndpoint } from "./profile.endpoint";

export * from "./profile.endpoint";
export * from "./profile.queries";
export * from "./profile.types";

export const profileIndex = profileEndpoint.index;
export const profileShow = profileEndpoint.show;
export const profileStore = profileEndpoint.store;
export const profileUpdate = profileEndpoint.update;
export const profileDestroy = profileEndpoint.destroy;
