import type { company, Pagination } from "@repo/types";

import { typedRequest } from "../../../../infrastructure/http/axios-client";
import type { CompanyIndexQuery } from "./company.types";

export const companyEndpoint = {
  index: (query?: CompanyIndexQuery) =>
    typedRequest<Pagination<company>>()({ route: "/manager/private/company/index", query }),
};
