import { user } from "@repo/types";
import { getProfile, setToken, setUser } from "@repo/cookies";

import * as types from "./types";

export type UserState = user | null;

const initialState = null;

type ModuleAction = {
  type: string;
  payload: user;
};

export default function userReducer(state: UserState = initialState, action: ModuleAction) {
  switch (action.type) {
    case types.USER_CREATE: {
      const data = parseUser(action.payload);
      return data;
    }
    case types.USER_UPDATE: {
      const updated = { ...state, ...action.payload };
      const data = parseUser(updated);
      return data;
    }
    case types.USER_REMOVE:
      return null;
    default:
      return state;
  }
}

const parseUser = (data: user) => {
  const profileId = getProfile();
  const profile = data.profiles?.find((p) => p.id === profileId);

  setUser({
    confirm: !data.confirmed,
    welcome: !data.profiles?.length,
    plans: !profile?.level_id && !profile?.company?.subscriptions?.length,
  });

  if (data?.user_tokens?.[0]?.token) {
    setToken(data.user_tokens[0].token);
  }

  if (data && "user_tokens" in data) {
    const { user_tokens, ...rest } = data;
    return rest;
  }

  return data;
};
