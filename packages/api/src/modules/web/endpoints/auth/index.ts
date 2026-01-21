// Direct function exports for backwards compatibility
import { authEndpoint } from "./auth.endpoint";

export * from "./auth.endpoint";
export * from "./auth.types";

export const authLogin = authEndpoint.login;
export const authHidrate = authEndpoint.hidrate;
export const authConfirm = authEndpoint.confirm;
export const authCode = authEndpoint.code;
export const authRecovery = authEndpoint.recovery;
export const authReset = authEndpoint.reset;
export const authChangePassword = authEndpoint.changePassword;
export const authOwner = authEndpoint.owner;
