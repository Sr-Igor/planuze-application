import type { user } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";
import type { LoginDTO } from "./auth.types";

export const authEndpoint = {
  login: (body: LoginDTO) => typedRequest<user>()({ route: "/manager/public/auth/login", body }),
};
