import { admin } from "@repo/types";

import * as types from "./types";

export const create = (params: admin) => {
  return {
    type: types.ADMIN_CREATE,
    payload: params,
  };
};

export const update = (params: Partial<admin>) => {
  return {
    type: types.ADMIN_UPDATE,
    payload: params,
  };
};

export const destroy = () => {
  return {
    type: types.ADMIN_REMOVE,
  };
};
