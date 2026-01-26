import { setToken } from "@repo/cookies";
import { admin } from "@repo/types";

import * as types from "./types";

export type AdminState = admin | null;

const initialState = null;

type ModuleAction = {
  type: string;
  payload: admin;
};

export default function adminReducer(state: AdminState = initialState, action: ModuleAction) {
  if (action.payload?.admin_tokens?.[0]?.token) {
    setToken(action.payload.admin_tokens[0].token);
  }

  if (action.payload && "admin_tokens" in action.payload) {
    const { admin_tokens, ...rest } = action.payload;
    action.payload = rest;
  }

  switch (action.type) {
    case types.ADMIN_CREATE: {
      return action.payload;
    }
    case types.ADMIN_UPDATE: {
      const updated = { ...state, ...action.payload };
      return updated;
    }
    case types.ADMIN_REMOVE:
      return null;
    default:
      return state;
  }
}
