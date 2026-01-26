import type { EndpointBody } from "@repo/types";

export type LoginDTO = EndpointBody<"/manager/public/auth/login">;
